import {Html} from '@react-three/drei'

const Loader = () => {
  return (
    // Whenever you're rendering something within a Canvas it has to be a special 3D property
    // To turn something which isn't 3D into 3D, we use react-three drei 
    <Html>
        <div className='flex justify-center items-center'>
            {/* Spinner */}
            <div className='w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin'/>
        </div>
    </Html>
  )
}

export default Loader