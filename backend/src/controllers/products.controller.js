import { pool } from "../db/db_postgre.js";
import { AsyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js"


// Add Product
const addProduct = AsyncHandler(async (req, res) => {
    const {title, description, brand, category, rating_average, rating_count, review_count, thumbnail, warranty_information, shipping_information, return_policy, minimum_order_quantity, highlights} = req.body

    if (!title || !description || !brand || !category)
        throw new ApiError(400, "All important fields are required")

    const queryText = 'INSERT INTO products(title, description, brand, category, rating_average, rating_count, review_count, thumbnail, warranty_information, shipping_information, return_policy, minimum_order_quantity, highlights) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id'

    const result = await pool.query(queryText, [title, description, brand, category, rating_average, rating_count, review_count, thumbnail, warranty_information, shipping_information, return_policy, minimum_order_quantity, JSON.stringify(highlights)])

    return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                {productId: result.rows[0].id}, 
                "Product added successfully"
            )
        ) 
})


// Get Product
const getProduct = AsyncHandler(async (req, res) => {
    const {id} = req.params

    const queryText = 'SELECT * FROM products WHERE id = $1';

    const productResult = await pool.query(queryText, [id])

    if (productResult.rows.length === 0) {
        throw new ApiError(404, "Product not found");
    }

    const productVariants = await pool.query(
        `SELECT * 
         FROM product_variants 
         WHERE product_id = $1`, 
        [id]
    )

    for (const variant of productVariants.rows) {
        const images = await pool.query(
            `SELECT image_url
             FROM product_images
             WHERE variant_id = $1
             ORDER BY id`,
            [variant.id]
        );
        variant.images = images.rows;
    }

    for (const variant of productVariants.rows) {
        const attribute = await pool.query(
            `SELECT * 
             FROM product_attributes
             WHERE variant_id = $1`,
             [variant.id]
        )
        variant.attributes = attribute.rows
    }

    const product = productResult.rows[0];
    product.variants = productVariants.rows


    return res.status(200).json(
        new ApiResponse(200, product)
    );
})


// Delete Product
const deleteProduct = AsyncHandler(async (req, res) => {
    const {id} = req.params

    const queryText = 'DELETE FROM products WHERE id = $1 RETURNING *'

    const result = await pool.query(queryText, [id])

    if (result.rows.length === 0) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                null, 
                `Product with id ${id} deleted successfully`
            )
        ) 
})


// Get All Products
const getAllProduct = AsyncHandler(async (req, res) => {
    const {gender, limit, sort} = req.query

    let queryText = `
    SELECT DISTINCT ON (p.id) 
        p.*, 
        pv.price, 
        pv.discount_percentage 
    FROM products p 
    JOIN product_variants pv 
        ON p.id = pv.product_id
    `

    let values = []

    if (gender) {
        queryText += `${values.length == 0 ? "WHERE" : "AND"} p.gender = $${values.length+1} `
        values.push(gender)
    }

    // if (gender) {
    //     queryText += `
    //         JOIN product_attributes pa
    //             ON pa.variant_id = pv.id
    //         WHERE pa.attribute_name = 'Gender'
    //             AND pa.attribute_value = $1
    //     `;

    //     values.push(gender)
    // }

    queryText += `ORDER BY p.id DESC LIMIT ${limit ? limit : 20}`

    const result = await pool.query(queryText, values);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                result.rows, 
            )
        ) 
})


// Add Product Variants
const addProductVariants = AsyncHandler(async (req, res) => {
    const {product_id} = req.params
    const {discount_percentage, stock, price, specifications} = req.body

    if (!product_id || stock == null || price == null) {
        throw new ApiError(400, "Product ID, stock and price are required")
    }

    const product = await pool.query('SELECT title, brand, category FROM products WHERE id = $1', [product_id])

    if (product.rowCount === 0) {
        throw new ApiError(404, "Product not found")
    }

    if (price <= 0) {
        throw new ApiError(400, "Price must be greater than 0");
    }

    if (stock < 0) {
        throw new ApiError(400, "Stock cannot be negative");
    }

    if (
        discount_percentage < 0 ||
        discount_percentage > 100
    ) {
        throw new ApiError(400, "Invalid discount percentage");
    }

    const queryText = 'INSERT INTO product_variants(product_id, discount_percentage, stock, price, specifications) VALUES($1, $2, $3, $4, $5) RETURNING *'

    const result = await pool.query(queryText, [product_id, discount_percentage, stock, price, JSON.stringify(specifications)])

    const variant = result.rows[0]
    const productData = product.rows[0]

    const sku = `${productData.title.slice(0, 3)}-${productData.brand.slice(0, 3)}-${productData.category.slice(0, 3)}-${product_id}-${variant.id}`

    await pool.query("UPDATE product_variants SET sku=$1 WHERE id = $2", [sku, variant.id])

    variant.sku = sku

    return res.status(201).json(new ApiResponse(201, variant, "Product variant added successfully"))
})


// Add Images
const addImages = AsyncHandler(async (req, res) => {
    const { variant_id } = req.params
    const { images } = req.body

    if (
            !images || 
            !Array.isArray(images) || 
            images.length === 0 ||
            images.some(img => typeof img !== "string" || img.trim() === "")
        ) {
        throw new ApiError(400, "Valid image URLs are required")
    }

    const variant = await pool.query('SELECT id FROM product_variants WHERE id = $1', [variant_id])

    if (variant.rowCount === 0) {
        throw new ApiError(404, "Variant not found");
    }

    await pool.query("BEGIN");

    try {
        for (const image of images) {
            await pool.query(
                "INSERT INTO product_images(variant_id, image_url) VALUES($1, $2)",
                [variant_id, image]
            );
        }

        await pool.query("COMMIT");
    } catch (err) {
        await pool.query("ROLLBACK");
        throw err;
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                null, 
                "Image added successfully"
            )
        ) 
})


/* const getImages = AsyncHandler(async (req, res) => {
    const {product_id} = req.params

    const product = await pool.query('SELECT id FROM products WHERE id = $1', [product_id])

    if (product.rowCount === 0) {
        throw new ApiError(404, "Product not found");
    }

    const queryText = 'SELECT id, image_url FROM product_images WHERE product_id = $1 ORDER BY id'

    const result = await pool.query(queryText, [product_id])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                result.rows, 
            )
        )  
})
*/


const deleteImages = AsyncHandler(async (req, res) => {
    const {variant_id, id} = req.params

    const product = await pool.query('SELECT id FROM products WHERE id = $1', [variant_id])

    if (product.rowCount === 0) {
        throw new ApiError(404, "Product not found");
    }

    const queryText = 'DELETE FROM product_images WHERE id = $1 AND product_id = $2 RETURNING *'

    const result = await pool.query(queryText, [id, variant_id])

    if (result.rowCount === 0) {
        throw new ApiError(404, "Image not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                null,
                "Image deleted successfully" 
            )
        )  
})


const addAttribute = AsyncHandler(async (req, res) => {
    const { variant_id } = req.params
    const { attributes } = req.body;

    if (
            !attributes || 
            !Array.isArray(attributes) || 
            attributes.length === 0 ||
            attributes.some(attr => !attr.attribute_name || !attr.attribute_value)
        ) {
        throw new ApiError(400, "Valid attributes array is required")
    }

    const variant = await pool.query('SELECT id FROM product_variants WHERE id = $1', [variant_id])

    if (variant.rowCount === 0) {
        throw new ApiError(400, "Product variant not found")
    }

    await pool.query('BEGIN')
    try {
        for (const attr of attributes) {
            await pool.query('INSERT INTO product_attributes(variant_id, attribute_name, attribute_value) VALUES($1, $2, $3)', [variant_id, attr.attribute_name, attr.attribute_value])
        }
        await pool.query('COMMIT') 
    } catch (error) {
        await pool.query('ROLLBACK')
        throw error
    }

    return res.status(201).json(new ApiResponse(201, null, "Product attribute added successfully"))
})


const deleteAttribute = AsyncHandler(async (req, res) => {
    
})

export { addProduct, getProduct, deleteProduct, getAllProduct, addImages, deleteImages, addProductVariants, addAttribute }