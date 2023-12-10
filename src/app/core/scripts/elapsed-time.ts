/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// Assuming you have the post object with the createdAt property

const objectCreatedAt = new Date();
const currentTime = new Date();

export const  getTimeElapsedString=(createdAt:Date, currentTime:Date)=> {
  const timeDiff = currentTime.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return ` منذ${days > 1 ? '' : ''} ${days} يوم `   ;
  } else if (hours > 0) {
    return ` منذ${hours > 1 ? '' : ''} ${hours} ساعة `   ;
  } else if (minutes > 0) {
    return ` منذ ${minutes > 1 ? '' : ''}${minutes} دقيقة ` ;
  } else {
    return ` منذ${seconds > 1 ? '' : ''} ${seconds} ثانية `;
  }
}

const timeElapsedString = getTimeElapsedString(objectCreatedAt, currentTime);
console.log(timeElapsedString); // Example output: "posted 2 hours ago"


export const ConvertFromTimeStamp=(timestamp:number)=>{
  const date = new Date(timestamp) 
}
export const ConvertToTimeStamp = (date: Date): number => {
  return date.getTime();
}
export const TimeLocalOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // weekday: 'long',
  // hour: 'numeric',
  // minute: 'numeric',
  // second: 'numeric',
  // timeZoneName: 'short',
  hour12: true,
  // era: 'long'
};

export function getCurrentMonth() {
  const now = new Date();
  const monthIndex = now.getMonth(); // Get the current month (0-11)
  
  // Since months are zero-based (0 = January, 11 = December), you may want to add 1 to the month index to get the actual month number.
  // If you want the month as a string (e.g., "January"), you can create an array of month names and return the corresponding name.
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[monthIndex];
  
  return currentMonth; // You can return the month name or index as needed.
}

// Usage:
const currentMonth = getCurrentMonth();
console.log(currentMonth); // This will log th