import React from 'react'
import { Collapse } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

export const MaskDetails: React.FunctionComponent<{
  showMaskDetails: boolean
  setShowMaskDetails: (val: boolean) => void
}> = ({ showMaskDetails, setShowMaskDetails }) => {
  return (
    <>
      <span
        className="expandable-header"
        onClick={() => setShowMaskDetails(!showMaskDetails)}
        aria-controls="mask-details"
        aria-expanded={showMaskDetails}
      >
        {showMaskDetails ? <BsChevronDown /> : <BsChevronRight />}
        Learn more about masks
      </span>
      <Collapse in={showMaskDetails}>
        <div id="mask-details">{maskDetailContents}</div>
      </Collapse>
    </>
  )
}

const maskDetailContents = (
  <>
    <ul>
      <li>
        Here are the different mask types ranked from most protective to least
        protective:
      </li>
      <ul>
        <li>
          [P100 + Goggles] &gt; N95 &gt; KN95 &gt; Surgical mask or mask with
          PM2.5 filter insert &gt; Cloth mask / bandana / buff
        </li>
      </ul>
      <li>
        For maximum protection, goggles and face shields provide additional
        protection for the eyes, which are another possible site of infection.
      </li>
      <li>It’s vital that your mask forms a tight seal around your mouth.</li>
      <ul>
        <li>
          It is VERY important to learn how to make sure your mask{' '}
          <a href="https://youtu.be/5-Ihvw5X3ks?t=57">fits properly</a>.
        </li>
        <li>
          No facial hair where the mask touches your face! Wearing an N95 over a
          beard is no better than wearing a surgical mask.
        </li>
      </ul>
      <li>
        P100 respirators provide you the best protection but are cumbersome and
        thus only ideal for high-risk scenarios.
      </li>
      <ul>
        <li>
          Note that P100 respirators have an outflow valve, which means you are
          not protecting others. To fix this, put a surgical mask or cloth mask
          over the outflow valve.
        </li>
        <li>
          P100s come with a range of possible filter cartridges. We recommend
          the basic particle filters, not the VOC filters, which are harder to
          breathe through and do not provide additional protection.
        </li>
        <li>
          In the US,{' '}
          <a href="https://www.amazon.com/3M-Facepiece-Respirator-Respiratory-Protection/dp/B001NDN29O/ref=sxts_sxwds-bia-wc-p13n1_0?cv_ct_cx=p100+respirator&amp;dchild=1&amp;keywords=p100+respirator&amp;pd_rd_i=B001NDN29O&amp;pd_rd_r=c5f2ecd8-38a2-4d27-8285-c201d17129a9&amp;pd_rd_w=mWGA9&amp;pd_rd_wg=SQBbr&amp;pf_rd_p=aa27be45-7294-48a8-8c11-546cebd55a37&amp;pf_rd_r=H7PHTRCQDAVYQNN96XPD&amp;psc=1&amp;qid=1602444258&amp;sr=1-1-a14f3e51-9e3d-4cb5-bc68-d89d95c82244">
            3M
          </a>{' '}
          and{' '}
          <a href="https://www.amazon.com/Miller-Electric-ML00895-Respirator-Single/dp/B00WIH1OVM/ref=sr_1_14?dchild=1&amp;keywords=p100+respirator&amp;qid=1602444258&amp;sr=8-14">
            Miller
          </a>{' '}
          (GVS Elipse) are two reputable brands we like.
        </li>
      </ul>
      <li>
        N95 masks and KN95 masks provide very good protection IF AND ONLY IF you
        get a good seal. You also need to be careful to get a reputable brand.
      </li>
      <ul>
        <li>
          Here are a few sites that we believe sell only high quality products:{' '}
          <a href="https://n95maskco.com/collections/n95-masks">Respokare</a>{' '}
          (let them air out for a week first),{' '}
          <a href="https://westcoastppe.com/">West Coast PPE</a>, and{' '}
          <a href="https://honestppe.supply/">Honest PPE</a>.
        </li>
        <li>
          If you find an unknown KN95 brand in the store, you can look it up at
          the{' '}
          <a href="https://www.cdc.gov/niosh/npptl/respirators/testing/NonNIOSHresults.html">
            CDC’s testing site
          </a>{' '}
          . You want the “minimum filtration efficiency” to be above 90.
        </li>
      </ul>
      <li>
        Surgical masks are very cheap and widely available, as are masks with
        PM2.5 filter inserts. They are both an easy upgrade over cloth masks.
      </li>
      <li>
        Cloth masks provide very limited protection to you, but still provide
        good protection to others. Of the various cloth materials,{' '}
        <a href="https://citizensofhumanity.com/products/cotton-mask-5-pack">
          denim
        </a>{' '}
        has the highest filtration efficiency. Cloth also has the benefit of
        being reusable after a wash. Here’s{' '}
        <a href="https://www.rickshawbags.com/face-masks">one brand</a> we like.
      </li>
      <li>
        Make sure you learn how to{' '}
        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks">
          handle and fit
        </a>{' '}
        masks properly.
      </li>
    </ul>
  </>
)

export default MaskDetails
