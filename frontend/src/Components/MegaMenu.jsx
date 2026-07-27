export function MegaMenu(props) {
    return (
        <div className="group">
            <div className={`cursor-pointer ${props.title === 'MEN' && "ml-[4vw]"} addHoverEffect py-7`}>
                {props.title}
            </div>

            <div className="absolute left-0 top-20 z-50 bg-[#ebebeb] px-10 py-5 border border-gray-400 rounded-md hidden group-hover:flex gap-10 overflow-x-auto w-[77vw] max-w-[90vw] xl:w-auto">
                <div className="flex flex-col">
                    {props.section1?.map((section, idx) => (
                        <ul key={section.heading} className="space-y-1 w-43">
                            <li className="cursor-pointer text-black font-bold">{section.heading}</li>

                            {section.items.map(item => (
                                <li key={item} className="cursor-pointer hover:font-bold">{item}</li>
                            ))}

                            <hr className={`my-4 text-gray-300 ${idx===props.section1.length-1 && "hidden"}`} />
                        </ul>
                    ))}
                </div>

                <div className="flex flex-col">
                    {props.section2?.map((section, idx) => (
                        <ul key={section.heading} className="space-y-1 w-50">
                            <li className="cursor-pointer text-black font-bold">{section.heading}</li>

                            {section.items.map(item => (
                                <li key={item} className="cursor-pointer hover:font-bold">{item}</li>
                            ))}

                            <hr className={`my-4 text-gray-300 ${idx===props.section2.length-1 && "hidden"}`} />
                        </ul>
                    ))}
                </div>

                <div className="flex flex-col">
                    {props.section3?.map((section, idx) => (
                        <ul key={section.heading} className="space-y-1 w-55">
                            <li className="cursor-pointer text-black font-bold">{section.heading}</li>

                            {section.items.map(item => (
                                <li key={item} className="cursor-pointer hover:font-bold">{item}</li>
                            ))}

                            <hr className={`my-4 text-gray-300 ${idx===props.section3.length-1 && "hidden"}`} />
                        </ul>
                    ))}
                </div>

                <div className="flex flex-col">
                    {props.section4?.map((section, idx) => (
                        <ul key={section.heading} className="space-y-1 w-45">
                            <li className="cursor-pointer text-black font-bold">{section.heading}</li>

                            {section.items.map(item => (
                                <li key={item} className="cursor-pointer hover:font-bold">{item}</li>
                            ))}

                            <hr className={`my-4 text-gray-300 ${idx===props.section4.length-1 && "hidden"}`} />
                        </ul>
                    ))}
                </div>

                <div className="flex flex-col">
                    {props.section5?.map((section, idx) => (
                        <ul key={section.heading} className="space-y-1 w-52">
                            <li className="cursor-pointer text-black font-bold">{section.heading}</li>

                            {section.items.map(item => (
                                <li key={item} className="cursor-pointer hover:font-bold">{item}</li>
                            ))}

                            <hr className={`my-4 text-gray-300 ${idx===props.section5.length-1 && "hidden"}`} />
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}