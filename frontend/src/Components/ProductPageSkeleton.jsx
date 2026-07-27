export function ProductPageSkeleton() {
    return (
        <main className="md:flex gap-8 px-3 sm:px-10 mt-15 animate-pulse">

            {/* Images */}
            <div className="grid grid-cols-2 w-full md:w-[60%] gap-3">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="bg-gray-200 aspect-square rounded"
                    />
                ))}
            </div>

            {/* Product Details */}
            <div className="mt-10 md:mt-0 w-full md:w-[40%]">

                {/* Brand */}
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>

                {/* Title */}
                <div className="h-6 bg-gray-200 rounded w-2/3 mt-3"></div>

                {/* Rating */}
                <div className="h-10 bg-gray-200 rounded w-40 mt-5"></div>

                <div className="border-b border-gray-200 mt-5"></div>

                {/* Description */}
                <div className="space-y-2 mt-5">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mt-5">
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded-full"></div>
                </div>

                {/* Price */}
                <div className="h-8 bg-gray-200 rounded w-52 mt-8"></div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Delivery */}
                <div className="mt-8">
                    <div className="h-6 bg-gray-200 rounded w-40"></div>

                    <div className="h-12 bg-gray-200 rounded w-64 mt-4"></div>

                    <div className="space-y-3 mt-5">
                        <div className="h-5 bg-gray-200 rounded"></div>
                        <div className="h-5 bg-gray-200 rounded"></div>
                        <div className="h-5 bg-gray-200 rounded"></div>
                    </div>
                </div>

            </div>
        </main>
    );
}