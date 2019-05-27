import React, { useState, Fragment, useEffect } from 'react';

const initialState = {
  longitude: null,
  latitude: null,
  speed:null
}
//implement useState hook
const App = ()  => {
  
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({x:null, y:null});
  const [status, setStatus] = useState(navigator.onLine);
  const [{ longitude, latitude, speed }, setLocation] = useState(initialState);
  let mounted = true;

  /*Inorder to insure that we have the right value of count 
  within every setter function provided by useState hook in this case setCount()
  we also have access to updater function through which we can get the previous/ current value of count.
  */
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  }

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  }

  const handleMouseMove = (event) => {
    setMousePosition(()=>({
      x : event.pageX,
      y : event.pageY
    }))
  }

  const handleOnline = () => {
    setStatus(true);
  }

  const handleOffline = () => {
    setStatus(false);
  }

  const handleGeolocation = (event) => {

    if(mounted){
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
       })
    }
    
  }
  /*By default use effect executes after every render.
  It takes function as an arrgument and it is called effect function.
  */
  useEffect(()=>{
    document.title = `You have clicked ${count} times`;
    //Mount event listner
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    //The return function act as a cleanup function and will remove the event listner once the component is unmount
    // As the useEffect function runs every time a component gets render and hence the return function cleans up the
    // effect of last render before running the effect again for the next time. this make this cleanup function more
    //powerful 
    
    /*
    To prevent cleanup function to run less frequently we can pass one more argument to  useEffect function
    the second argument is an array of values if there is a value on which one of our useEffect depends on we can 
    put them into an this array  
    */
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    }
  },[count])

  return (
    <Fragment>
      <h2>Counter</h2>
      
      <button onClick={incrementCount}>
        I was clicked {count} times
      </button>

      <h2>Toggle Light</h2>
            <img
              src = {
                isOn
                  ? 'http://icon.now.sh/highlight/fd0'
                  : 'http://icon.now.sh/highlight/aaa'
              }
              style ={{
                  height: '50px',
                  width: '50px',
                }}
                alt="FlashLight"
                onClick = {toggleLight}
            />

        <h2>Mouse Position</h2>
        <p>X position: {mousePosition.x}</p>
        <p>Y position: {mousePosition.y}</p>


        <h2>Network Status</h2>
        <p>Yor are <strong>{status ? "online" : "offline"}</strong></p>

        <h2>Location</h2>
        <p>latitude is {latitude}</p>
        <p>longitude is {longitude}</p>
        <p>Your speed is {speed ? speed : "0"}</p>
    </Fragment>
  );

}

export default App;
