import ClientNav from "../_components/ClientNav"

export default function page(props) {

    console.log("props from named page", props)

    return (
        <>
            <div>
                <ClientNav />
                <div id="default-carousel" className="relative w-full" data-carousel="slide">
                    <div className="relative h-56 overflow-hidden md:h-96" >
                        <img src="https://images.pexels.com/photos/5490999/pexels-photo-5490999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img" className="object-top" />
                        <h3 className="text-white text-4xl font-extrabold absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%]">{decodeURI(props.params.name)}</h3>
                    </div>
                </div>
            </div>

        </>
    )
};
