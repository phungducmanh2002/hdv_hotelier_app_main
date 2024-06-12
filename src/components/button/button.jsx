const ButtonCustom = ({label, submit, handleClick}) => {
    return (
        <div className="flex justify-end">
                <button  type={`${submit === 1 ? 'submit' : ''}`} className="bg-green-400 p-2 rounded-md border-2 border-white whitespace-nowrap" onClick={handleClick}>{label}</button>
            </div>
    )
}
export default ButtonCustom