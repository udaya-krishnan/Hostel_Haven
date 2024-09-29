const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    // Format the date options
    const options = {
      weekday: 'short',  // Sat
      year: 'numeric',   // 2024
      month: 'short',    // Jul
      day: 'numeric',    // 27
      hour: 'numeric',   // 12
      minute: 'numeric', // 00
      hour12: true       // PM
    };
  
    return `${date.toLocaleDateString('en-US', options)}, From ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  };
  

  export default formatDate