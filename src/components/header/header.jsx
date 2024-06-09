import Link from "next/link";

import DropdownMenu from "../dropdown/dropDownMenu";
export default function HeaderPage () {
    return (
        <div className="bg-blue-200" >
            <nav className={`items-center flex justify-between`}>
                <Link className="flex" href="/hotel">
                    <div>Trang chủ</div>
                </Link>
                <DropdownMenu></DropdownMenu>
            </nav>
            
        </div>
    )
}