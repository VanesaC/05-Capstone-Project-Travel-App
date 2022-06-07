export function calculateData(startDate, endDate) {
  let sDate = new Date(startDate);
  let eDate = new Date(endDate);
  let dateDiff = eDate - sDate;
  let dateDiffInDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
  console.log('Client side durata calatorie');
  console.log(dateDiffInDays);
  // return dateDiffInDays;
  document.getElementById('travelLength').innerHTML =
    'Your trip length is ' + dateDiffInDays + ' days.';
}
const updateUI3 = async () => {
  const request = await fetch('/sendWeatherToClient');
  // console.log(request);

  try {
    const allData = await request.json();
    console.log('A luat vremea si precip');
    console.log(allData);
    document.getElementById('temperature').innerHTML =
      'The temperature forecast is ' +
      allData.weather.data['0'].temp +
      '°C degrees.';
    document.getElementById('precip').innerHTML =
      'The precipitation estimation is ' +
      allData.weather.data['0'].precip +
      ' %.';

    if (allData.counter == 1) {
      document.getElementById('travelCounter').innerHTML =
        'Your trip is ' + allData.counter + ' day away.';
    } else {
      document.getElementById('travelCounter').innerHTML =
        'Your trip is ' + allData.counter + ' days away.';
    }
    let formData = document.getElementById('startDate').value;
    let formData2 = document.getElementById('endDate').value;

    calculateData(formData, formData2);
  } catch (erorr) {
    console.log('error');
  }
};

export async function updateUI2(lat, lon, country) {
  let userData = { lat: lat, lon: lon, country: country };
  console.log('Lat and lon are');
  console.log(userData);
  const options = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  fetch('/sendingLatandLonToServer', options);
  await updateUI3();
}
const updateUI = async () => {
  // console.log('UpdateUI function');
  const request = await fetch('/sendingLatandLonToClient');
  // console.log(request);
  try {
    const allData = await request.json();
    console.log('A luat lat si lon');
    console.log(allData);
    await updateUI2(
      allData.geonames[0].lat,
      allData.geonames[0].lng,
      allData.geonames[0].countryName
    );
  } catch (erorr) {
    console.log('error');
  }
};

export function handleSubmit(event) {
  event.preventDefault();
  const addImage = async () => {
    const request = await fetch('/sendingImageToClient');
    // console.log(request);

    try {
      const allData = await request.json();
      console.log('A luat imaginea');
      console.log(allData);
      document.getElementById('destinationImage').src =
        allData.hits['0'].largeImageURL;
    } catch (erorr) {
      console.log('error');
    }
  };
  // check what text was put into the form field
  let formLocation = document.getElementById('location').value;
  console.log(formLocation);
  let formData = document.getElementById('startDate').value;
  let formData2 = document.getElementById('endDate').value;
  let diferenta = calculateData(formData, formData2);
  // console.log(formData);
  let userData = { location: formLocation, data: formData };
  console.log('::: Form Submitted :::');
  const options = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  if (formLocation.length > 0 && formData.length > 0) {
    fetch('/sendingCityDataToServer', options)
      .then(updateUI())
      .then(addImage());
  } else {
    alert(
      'Xx The text entered is not a valid city or is not a valid data, try again xX'
    );
  }
}
