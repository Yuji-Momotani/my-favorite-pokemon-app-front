import {FaStar} from "react-icons/fa"

const Star = ({selected = false, onSelect }) => {
	return (
		<FaStar color={ selected ? "red" : "grey"} onClick={onSelect} className="cursor-pointer" />
	)
}

export default Star