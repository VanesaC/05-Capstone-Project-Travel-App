/**
 * @jest-environment jsdom
 */
import { handleSubmit } from '../src/client/js/formHandler';
import { calculateData } from '../src/client/js/formHandler';
import { updateUI2 } from '../src/client/js/formHandler';
// import { isValidHttpUrl } from '../src/client/js/formValidation';

test('Testing handlesubmit function', () => {
  document.body.innerHTML = `<form name="myForm" class="" onsubmit="return Client.handleSubmit(event)">
  <div class="inputForms">
     <div class="inputFormT">
        <p>Enter the location you are travelling to:</p>
        <input id="location" class='round' type="text" name="input" value=""  placeholder=" Location">
     </div>
     <div class="inputFormT">
        <p>Enter the leaving and departing date:</p>
        <input id="startDate" class='round' type="date" name="input" value=""  placeholder="Name">
        <input id="endDate"  class='round' type="date" name="input" value=""  placeholder="Name">
     </div>
  </div> <!-- Closes inputForms div -->
  <div class="secondContainer">
 
  <input type="submit" id="subBttn"name="" value="SUBMIT TRIP INFO" onclick="" onsubmit="">
</form>

<section>
               
<div id="results">
   <div id = "temperature"></div>
   <div id = "precip"></div>
   <div id = "travelCounter"></div>
   <div id = "travelLength"></div>
</div>
<div id = "image"> <img id='destinationImage'  alt="" width="400" >  </div>
<p id="credits">Photo credits: <a href='https://pixabay.com/'>Pixabay</a></p>
</section>`;
  document.getElementById('travelLength').innerHTML = 'Test';
  const event = { preventDefault: () => {} };
  const mockEvent = jest.spyOn(event, 'preventDefault');
  handleSubmit(event);
  expect(mockEvent).toHaveBeenCalled();
});
