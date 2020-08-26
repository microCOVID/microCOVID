import React from 'react'

export const Home = (): React.ReactElement => {
  return <div>
  	
  	<p>You’re already familiar with some rules of thumb for avoiding COVID-19 infection: wear a mask, stay 6 feet apart, and only socialize outdoors. But just how much do these things help? What happens if you get closer than 6ft? Is it safe to eat at a restaurant indoors? It’s tough to make good choices when you don’t know how large or small the risks really are.
  	</p>

	<p>We—the authors—were really struggling with this. We wanted a rigorous way to make decisions about COVID risk. So we trawled the scientific literature for data and spent hours estimating the COVID risk of various activities. 
	</p>

	<p>
	This website contains the output of that research: <b>a <a href ="https://www.microcovid.org/calculator/">calculator</a> that you can use to calculate your COVID risk, a <a href ="https://www.microcovid.org/paper/">white paper</a> that details our methodology, and a <a href ="https://www.microcovid.org/spreadsheet/">spreadsheet</a> to track your COVID risk over time.</b>
	</p>

	<h3><a href ="https://www.microcovid.org/calculator/">I. The Calculator</a></h3>

	<p>Based on our findings, we created a calculator to assess “cost” in microCOVIDs of various activities. We hope you’ll use it to build your intuition about the comparative risk of different activities and as a harm-reduction tool to make safer choices.</p>

	<p>The “cost” of any given activity is based on several factors including: the prevalence of COVID in your area, how many people you’re with (for how long), and whether you’re inside or outside (with masks or not).</p>

	<p><i>Note: This calculator works best if you live in the United States and are not at high risk of severe complications from COVID. We did not focus on society-wide pandemic dynamics, policy responses, or suggestions for public health officials.</i></p>

	<h3><a href ="https://www.microcovid.org/paper/">II. The White Paper</a></h3>

	In the white paper we show:
	<ul>
		<li>How we measure COVID infection risk, in units of “microCOVIDs”</li>
		<li>How risky we think various common activities are</li>
		<li>How you can estimate the COVID risk of your own actions (using our handy-dandy [COVID risk calculator](https://www.microcovid.org/calculator))</li>
		<li>And, most importantly, how to make decisions that balance freedom and fun with safety and health.</li>
	</ul>

	

	<h3><a href ="https://www.microcovid.org/spreadsheet/">III. The Spreadsheet</a></h3>

	<p>After you're done exploring the calculator and the white paper, you can begin to track your COVID risk on a spreadsheet. We recommend starting with the calculator and white paper before diving into this.</p>

	<hr />

	<p>We hope the calculator, white paper, and spreadsheet help you live more safely during the pandemic. If you have any feedback, questions, or would like to help out, please contact us here. If you found this helpful and want to donate, we'd truly appreciate it. Please do so here.</p>

	<p><i>Disclaimer: This article (and corresponding calculator) was collaboratively written by the members and friends of Ibasho, a communal house in San Francisco. Our goal is to protect our community’s physical and mental health during the pandemic, by promoting balanced evidence-based decision-making by individual citizens. We have based our numbers in this article on scientific research; however, none of us are epidemiologists and our model is still a guess and not an authoritative “truth”. Please continue to follow government guidance.</i></p>

  </div>
}
