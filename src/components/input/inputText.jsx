export default function InputText({label, type, name, value, onChange}){
    return(
    <div className='flex justify-between items-center mb-4'>
        <label htmlFor="name" className="mr-2">{label}</label>
        <input className='p-1 border-2 rounded-md' type={type} name={name} value={value} onChange={onChange} required/>
      </div>
    )
}