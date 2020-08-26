import React from 'react'

export const Spreadsheet = (): React.ReactElement => {
  return (
    <div>
	  <p>Each row on the spreadsheet does exactly the same thing as the <a href="/calculator">calculator</a>.</p>
      <p>The <a href="https://docs.google.com/spreadsheets/d/1DYIJgjG3H5rwt52NT2TX_m429snmIU-jGw1a8ZODwGQ">spreadsheet</a> is a tool to help you with two things that the <a href="/calculator">calculator</a> is not quite powerful enough for:</p>
	  <p><ol><li>The first use case is to <b>calculate someone's <a href="/paper/6-person-risk">Person Risk</a></b> using the <a href="/paper/9-advanced-method">Advanced Method</a> as described in the white paper. The Advanced Method consists of adding up the person's risk in from their behaviors in the last 2-9 days. The spreadsheet makes it easy to add up.</li>
	  <li>The second use case is to <b>track your own microCOVIDs</b> over a longer period of time. You might do this for a few reasons:
	  <ul><li>making a risk assessment for yourself,</li><li>communicating with others about your risk status (e.g. by sending them a link to a sheet listing your recent behavior and current risk to them)</li>
	  <li>creating agreements with housemates about how many "microCOVIDs" you are allowed to "spend" in a week or a month.</li></ul></li></ol></p>
    </div>
  )
}
