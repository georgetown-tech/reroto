import * as React from "react"
import { Link } from "next"
const Program = ({ title, slug, description }) => {

    return <Link className="block w-full h-full" to={`/projects/${slug}`}>
        <div className="rounded shadow p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-md">{description || ""}</p>
        </div>
    </Link>

}

export default Program
