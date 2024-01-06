import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Added useEffect
import { useState, useEffect } from 'react';

export default function CreateWorkout() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    load: '135',
    reps: '10',
    sets: '3',
    duration: '10',
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  //New
  const [workoutCategory, setWorkoutCategory] = useState({
    category: 'weight training'
  });

  // Event handler for change exercise category
   const handleCategoryChange = (e) => {
    setWorkoutCategory({
      [e.target.id]: e.target.value

    })
  }
  console.log(workoutCategory)

  // Handle change for form elements
  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' 
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };


  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/workout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workoutCategory,
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate('/workout');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Send workout type from select

  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-electric-300 text-center my-7 font-teko text-6xl'>
        Create Workout
      </h1>
      <p className='text-xl text-electric-300 font-teko mb-3'>Select Exercise Category:</p>
      <div className='flex flex-col gap-4 flex-1 mb-7'>
        <select 
          value={workoutCategory.category} 
          onChange={handleCategoryChange} 
          className='border-2 border-electric-300 p-3 rounded-lg font-teko text-cinder-950 text-lg'
          id='category'
          >
            <option value={'weight training'}>Weight Training</option>
            <option value={'cardio'}>Cardio</option>
        </select>
      </div>
      {/* Conditional rendering based on boolean state for select option */}
      { workoutCategory.category === 'weight training' && (
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
          <input
            type='text'
            placeholder='Exercise Title'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='title'
            required
            onChange={handleChange}
            value={formData.title}
          />
          <p className='text-electric-300 font-teko text-xl'>Load (in lbs):</p>
          <input
            type='text'
            placeholder='Load'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='load'
            required
            onChange={handleChange}
            value={formData.load}
          />
          <p className='text-electric-300 font-teko text-xl'>Reps:</p>
          <input
            type='text'
            placeholder='Reps'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='reps'
            required
            onChange={handleChange}
            value={formData.reps}
          />
          <p className='text-electric-300 font-teko text-xl'>Sets:</p>
          <input
            type='text'
            placeholder='Sets'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='sets'
            required
            onChange={handleChange}
            value={formData.sets}
          />
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Adding Exercise...' : 'Add Exercise'}
            </button>
            {error && <p className='text-electric-300 text-sm'>{error}</p>}
        </div>
      </form>
      )}
      {workoutCategory.category === 'cardio' && (
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
          <input
            type='text'
            placeholder='Exercise Title'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='title'
            required
            onChange={handleChange}
            value={formData.title}
          />
          <p className='text-electric-300 font-teko text-xl'>Exercise Duration (minutes):</p>
          <input
            type='text'
            placeholder='Exercise Duration'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='duration'
            required
            onChange={handleChange}
            value={formData.duration}
          />
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Adding Exercise...' : 'Add Exercise'}
            </button>
            {error && <p className='text-electric-300 text-sm'>{error}</p>}
        </div>
        </form>
      )}
    </main>
  );
}

// Works with Menu
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // Added useEffect
// import { useState, useEffect } from 'react';

// export default function CreateWorkout() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     load: '',
//     reps: '',
//     sets: '',
//     duration: '1',
//   });


//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   console.log(formData);

  
//   //New
//   // const [workoutType, setWorkoutType] = useState({
//   //   category: 'weight training'
//   // });
//   const [workoutCategory, setWorkoutCategory] = useState('weight training')
//   const [weightTrainingVisible, setWeightTrainingVisible] = useState(false);
//   const [cardioVisible, setCardioVisible] = useState(false);

//   useEffect(() => {
//     workoutCategory === 'cardio'
//     ? setCardioVisible(true)
//     : setCardioVisible(false);
//     workoutCategory === 'weight training'
//     ? setWeightTrainingVisible(true)
//     : setWeightTrainingVisible(false)
//   }, [workoutCategory]);

//   const handleSelectChange = (e) => {
//     setWorkoutCategory(e.target.value)
//   };
//    // const handleSelectChange = (e) => {
//   //   // setWorkoutType(e.target.value);
//   //   if (
//   //     e.target.type === 'select'
//   //   ) {
//   //     setWorkoutType({
//   //       ...workoutType,
//   //       [e.target.id]: e.target.value

//   //     })
//   //   }
//   // }
//   console.log(workoutCategory)

//   // Handle change for form elements
//   const handleChange = (e) => {
//     if (
//       e.target.type === 'number' ||
//       e.target.type === 'text' 
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value,
//       });
//     }
//   };


//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/workout/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // ...workoutCategory,
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       }
//       navigate('/workout');
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   // Send workout type from select

//   return (
//     <main className='p-3 max-w-xl mx-auto'>
//       <h1 className='text-3xl text-electric-300 text-center my-7 font-teko text-6xl'>
//         Create Workout
//       </h1>
//       <p className='text-xl text-electric-300 font-teko mb-3'>Select Exercise Category:</p>
//       <div className='flex flex-col gap-4 flex-1 mb-7'>
//         <select 
//           type='select'
//           value={workoutCategory} 
//           onChange={handleSelectChange} 
//           className='border-2 border-electric-300 p-3 rounded-lg font-teko text-cinder-950 text-lg'
//           // id='category'
//           >
//           <option value='weight training'>Weight Training</option>
//           <option value='cardio'>Cardio</option>
//         </select>
//       </div>
//       {/* Conditional rendering based on boolean state for select option */}
//       { weightTrainingVisible && (
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
//           <input
//             type='text'
//             placeholder='Exercise Title'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='title'
//             required
//             onChange={handleChange}
//             value={formData.title}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Load (in lbs):</p>
//           <input
//             type='text'
//             placeholder='Load'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='load'
//             required
//             onChange={handleChange}
//             value={formData.load}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Reps:</p>
//           <input
//             type='text'
//             placeholder='Reps'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='reps'
//             required
//             onChange={handleChange}
//             value={formData.reps}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Sets:</p>
//           <input
//             type='text'
//             placeholder='Sets'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='sets'
//             required
//             onChange={handleChange}
//             value={formData.sets}
//           />
//           <button 
//             disabled={loading}
//             className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
//               {loading ? 'Adding Exercise...' : 'Add Exercise'}
//             </button>
//             {error && <p className='text-electric-300 text-sm'>{error}</p>}
//         </div>
//       </form>
//       )}
//       {cardioVisible &&(
//         <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
//           <input
//             type='text'
//             placeholder='Exercise Title'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='title'
//             required
//             onChange={handleChange}
//             value={formData.title}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Exercise Duration</p>
//           <input
//             type='text'
//             placeholder='Exercise Duration'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='duration'
//             required
//             onChange={handleChange}
//             value={formData.duration}
//           />
//         </div>
//         </form>
//       )}
//     </main>
//   );
// }

// Original
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// export default function CreateWorkout() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     load: '',
//     reps: '',
//     sets: '',
//   });

//   //New
//   const [workoutType, setWorkoutType] = useState('cardio');

//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   console.log(formData);



//   // Handle change for form elements
//   const handleChange = (e) => {
//     if (
//       e.target.type === 'number' ||
//       e.target.type === 'text' 
//     ) {
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value,
//       });
//     }
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/workout/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       }
//       navigate('/workout');
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };




// Original
//   return (
//     <main className='p-3 max-w-xl mx-auto'>
//       <h1 className='text-3xl text-electric-300 text-center my-7 font-teko text-6xl'>
//         Create Workout
//       </h1>
//       {/* <select name='SelectType' className=''>
//         <option value='weightTraining'>Weight Training</option>
//         <option value='cardio'>Cardio</option>
//       </select> */}
//       <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
//         <div className='flex flex-col gap-4 flex-1'>
//           <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
//           <input
//             type='text'
//             placeholder='Exercise Title'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='title'
//             required
//             onChange={handleChange}
//             value={formData.title}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Load (in lbs):</p>
//           <input
//             type='text'
//             placeholder='Load'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='load'
//             required
//             onChange={handleChange}
//             value={formData.load}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Reps:</p>
//           <input
//             type='text'
//             placeholder='Reps'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='reps'
//             required
//             onChange={handleChange}
//             value={formData.reps}
//           />
//           <p className='text-electric-300 font-teko text-xl'>Sets:</p>
//           <input
//             type='text'
//             placeholder='Sets'
//             className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
//             id='sets'
//             required
//             onChange={handleChange}
//             value={formData.sets}
//           />
//           <button 
//             disabled={loading}
//             className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
//               {loading ? 'Adding Exercise...' : 'Add Exercise'}
//             </button>
//             {error && <p className='text-electric-300 text-sm'>{error}</p>}
//         </div>
//       </form>
//     </main>
//   );
// }