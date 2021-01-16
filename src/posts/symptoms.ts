const title = 'Symptoms Checklist'
const shortTitle = 'Symptoms Checklist'
const content = `
You can use this page as a reminder for which COVID symptoms to be mindful of. _(This page is designed for microCOVID spreadsheet users to send to a contact they are interacting with.)_

<div class="alert alert-warning"><strong>Disclaimer:</strong> This page is for informational purposes only, not for a medical diagnosis.</div>

<table>
  <tr>
   <th colspan="2"><strong>Symptoms: </strong>Do you have any of these symptoms?  \
Are they <em><span style="text-decoration:underline;">new</span></em>, <em><span style="text-decoration:underline;">concerning</span></em>, or <em><span style="text-decoration:underline;">not easily explainable</span></em>?
   </th>
  </tr>
  <tr>
   <td colspan="2" style="font-size:1.3em; line-height:1.5em;">
<ul>
<li>🌡️ Fever (<a href="https://www.washingtonpost.com/business/2020/05/15/fever-screening-coronavirus/">99.5 or above</a>)</li>
<li>🥵 Subjective “feverish feeling”</li>
<li>🥶 Chills</li>
<li>💨 Cough (especially a dry cough)</li>
<li>😮 Shortness of breath / difficulty breathing</li>
<li>👅 New loss of taste or smell</li>
</ul>
   </td>
  </tr>
  <tr>
   <td colspan="2" >
    <em>Other less-common COVID symptoms:</em> \
😓 fatigue, 💥 body aches, 🤯 headache, 😩 sore throat, 🤢 nausea or vomiting, 💩 diarrhea
   </td>
  </tr>
</table>


**🌡️ If you do have symptoms now…**

*   Let the person you’re seeing know beforehand. You are much more likely to have COVID if you currently have symptoms, and they will want to factor this increased risk into their risk budget.

**📞 Are you willing to report any symptoms you develop over the next 10 days?**

*   Doing so will allow the person you’re seeing to quarantine earlier while they are likely less contagious, thereby reducing the spread of COVID.
*   If you agree to report symptoms, let the person you’re seeing know so they can account for that in their budget.
*   Please report symptoms within 24 hours of when they begin, so the person you interacted with can begin to quarantine.

**Other resources:** You can do a more detailed [self-assessment survey](https://landing.google.com/screener/covid19) here. You can read more about [COVID symptoms](https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html) here.


`

const post = { title, shortTitle, content }
export default post
