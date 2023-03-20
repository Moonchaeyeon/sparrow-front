import ThreeCanvas from "../../canvas";

function Scene({ props, children }) {

    return (
        <>
            <ThreeCanvas />
            { children }
        </>
    )
}
export default Scene;