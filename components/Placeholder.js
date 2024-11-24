import Image from "next/image";

export default function Placeholder() {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <Image src="https://static.wikia.nocookie.net/crossroads/images/f/f5/Grimoire_de_Ma%C3%AEtre.png/revision/latest?cb=20170325200219&path-prefix=fr"
                alt="spellbook"
                width={300}
                height={300}
            />
        </div>
    )

}