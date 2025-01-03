import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function MoviesDetails() {

    const singleMovieData = useLoaderData();
    const { _id, photo, title, genry, duration, year, ratting, summary } = singleMovieData;
     const Navigate = useNavigate();
    const allMovie = ()=>{
       Navigate('/allmovives');
    }

    const handledelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this movie",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://movie-portal-back.vercel.app/delete/${id}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        Swal.fire({
                            position: "center center",
                            icon: "success",
                            title: "Deleted successfully",
                            showConfirmButton: false,
                            timer: 2500
                          });
                    }
                    // console.log(data);
                    Navigate('/allmovives');
                    
                })
            }
          });
    }

    /// Updated movies functionality start here here now ---------------------------------

    const handleUpdate = (id) => {
        Navigate(`/updatemovie/${id}`);
    }

    /// favirite functionality starting .................................

    const handleFavirite = ()=>{
        // console.log("handleFavirite is clicked");
        const faviriteInfo = { photo, title, genry, year, ratting };
        // console.log(faviriteInfo);
        

        /// faviirte and database hitting .....................

        fetch(`https://movie-portal-back.vercel.app/addfavorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(faviriteInfo)
        })
       .then(response => response.json())
       .then(data => {
        //  console.log(data);
        Swal.fire({
            position: "center center",
            icon: "success",
            title: "Favorited",
            showConfirmButton: false,
            timer: 2500
          });
       })
        
    }

    return (
        <>
            <div className=' flex flex-col justify-center items-center my-10'>
                <h2 className=' text-3xl font-bold my-3'>Movie Details</h2>
                 <div className=' flex justify-center items-center gap-5 mt-5'>
                <button onClick={()=>handleUpdate(_id)} className=' btn btn-success font-semibold text-white'>Update Movie</button>
                 </div>
            </div>
                <div className=" container mx-auto grid grid-cols-5 gap-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className=' col-span-3'>
                    <img className="object-cover w-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={photo} alt="" />
                    </div>
                    <div className="flex flex-col justify-center p-4 w-full">
                        <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-semibold text-lg'>Description:</span> {summary}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Genry: {genry}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Duration: {duration}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Year: {year}</p>
                        <p className="mb-3 font-semibold text-lg text-gray-700 dark:text-gray-400">Ratting: <span className=' bg-gray-600 p-2 rounded-full'>{ratting}</span></p>
                         <div className=' flex justify-between gap-5 items-center mt-5'>
                         <button onClick={()=> handledelete(_id)} className=' btn btn-error font-semibold text-white'>Delete Movie</button>
                         <Link onClick={handleFavirite} className=' btn btn-primary font-semibold text-white'>Add to Favorite</Link>
                         <button onClick={allMovie} className=' btn btn-accent font-semibold text-white'>See all movies</button>
                         </div>
                    </div>
                </div>
        </>
    )
}
