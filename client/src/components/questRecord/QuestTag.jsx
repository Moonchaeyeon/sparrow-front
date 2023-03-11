import { IoClose } from "react-icons/io5";

function QuestTag({ tagName, deleteTag }) {

    return (
        <div className="quest-tag-elem">
            <span className="tag-elem-name"># { tagName }</span>
            <IoClose 
                className="tag-elem-delete"
                onClick={()=>{deleteTag(tagName)}}
            />
        </div>
    )
}

export default QuestTag;