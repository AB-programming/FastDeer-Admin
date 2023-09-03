import { useRoutes } from "react-router-dom";
import routes from "../../routes";

export default function Preferences() {
    const element = useRoutes(routes)
    return (
        <div>
            <h2>Preferences</h2>
            {element}
        </div>
    )
}