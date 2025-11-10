import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import { Icon } from '@iconify/react';
import AuthorWidget from '../Widget/AuthorWidget';
import { pageTitle } from '../../helpers/PageTitle';

export default function BlogDetailsPage() {
  pageTitle('Blog Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Stay up to date with our <br>latest blog post"
        variant="text-center"
        shape="shape_5"
        category="Marketing"
        date="07 Mar 2022"
        avatar="Tech"
        avatarLink="/"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <img
          src="/images/blog/post_details_1.jpeg"
          alt="Blog"
          className="cs_radius_15"
        />
        <div className="cs_height_60 cs_height_lg_40" />
        <div className="cs_post_details">
          <h3>
            In this blog that provides readers with valuable information and
            guidance on all aspects of marketing. From social media to SEO
            analize, branding to lead generation, our team of experienced
            marketers shares their expertise and industry knowledge to help you
            stay ahead of the curve. Our articles are designed to be accessible
            and actionable, providing tips and strategies.
          </h3>
          <p>
            On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment, so blinded by desire, that they cannot
            foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of
            will, which is the same as saying through shrinking from toil and
            pain. These cases are perfectly simple and easy to distinguish. In a
            free hour, when our power of choice is untrammelled and when nothing
            prevents our being able to do what we like best, every pleasure is
            to be welcomed and every pain avoided. But in certain circumstances
            and owing to the claims of duty or the obligations of business it
            will frequently occur that pleasures have to be repudiated and
            annoyances accepted. The wise man therefore always holds in these
            matters to this principle of selection: he rejects pleasures to
            secure other greater pleasures, or else he endures pains to avoid
            worse pains.
          </p>
          <p>
            When nothing prevents our being able to do what we like best, every
            pleasure is to be welcomed and every pain avoided. But in certain
            circumstances and owing to the claims of duty or the obligations of
            business it will frequently occur that pleasures have to be
            repudiated and annoyances accepted. The wise man therefore always
            holds in these matters to this principle of selection: he rejects
            pleasures to secure other greater pleasures, or else he endures
            pains to avoid worse pains. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores.
          </p>
          <div className="cs_height_10 cs_height_lg_5" />
          <div className="row">
            <div className="col-md-4">
              <img
                src="/images/blog/post_details_2.jpeg"
                alt="Thumb"
                className="w-100"
              />
            </div>
            <div className="col-md-4">
              <img
                src="/images/blog/post_details_3.jpeg"
                alt="Thumb"
                className="w-100"
              />
            </div>
            <div className="col-md-4">
              <img
                src="/images/blog/post_details_4.jpeg"
                alt="Thumb"
                className="w-100"
              />
            </div>
          </div>
          <div className="cs_height_10 cs_height_lg_5" />
          <h3>The powerful of digital marketing with new era</h3>
          <p>
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized by the charms of pleasure of the moment, so
            blinded by desire, that they cannot foresee the pain and trouble
            that are bound to ensue; and equal blame belongs to those who fail
            in their duty through weakness of will, which is the same as saying
            through shrinking from toil and pain. These cases are perfectly
            simple and easy to distinguish. In a free hour, when our power of
            choice is untrammelled and when nothing prevents our being able to
            do what we like best, every pleasure is to be welcomed and every
            pain avoided. But in certain circumstances.
          </p>
          <blockquote>
            “ But I must explain to you how all this mistaken idea of denouncing
            non off pleasure and praising pain was born and I will give you a
            complete account of the system, who expound the actual teachings of
            the great explorer”
            <small>Loren Mulari</small>
          </blockquote>
          <p>
            Righteous indignation and dislike men who are so beguiled and
            demoralized by the charms of pleasure of the moment, so blinded by
            desire, that they cannot foresee the pain and trouble that are bound
            to ensue and equal blame belongs to those who fail in their duty
            through weakness of will, which is the same as saying through
            shrinking from toil and pain. These cases are perfectly simple and
            easy to distinguish.{' '}
          </p>
          <ul>
            <li>In a free hour, when our power of choice is untrammelled </li>
            <li>and when nothing prevents our being able to do what </li>
            <li>
              we like best, every pleasure is to be welcomed and every pain
              avoided.
            </li>
          </ul>
        </div>
        <div className="cs_height_30 cs_height_lg_10" />
        <div className="cs_post_share">
          <div className="cs_categories">
            <a href="/" className="cs_category">
              Marketing
            </a>
            <a href="/" className="cs_category">
              Campaign
            </a>
          </div>
          <div className="text-center">
            <div className="cs_post_share_btns">
              <a href="/">
                <Icon icon="fa6-brands:twitter" />
              </a>
              <a href="/">
                <Icon icon="fa6-brands:facebook-f" />
              </a>
              <a href="/">
                <Icon icon="fa6-brands:linkedin-in" />
              </a>
            </div>
            <span className="cs_post_share_title">Share this</span>
          </div>
        </div>
        <div className="cs_height_50 cs_height_lg_40" />
        <AuthorWidget />
        <div className="cs_height_88 cs_height_lg_60" />
        <h2 className="text-center cs_fs_50 mb-0">Leave A Reply</h2>
        <div className="cs_height_60 cs_height_lg_30" />
        <form action="#" className="row">
          <div className="col-lg-6">
            <input
              type="text"
              className="cs_form_field_2"
              placeholder="What’s Your Name?"
            />
            <div className="cs_height_50 cs_height_lg_30" />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              className="cs_form_field_2"
              placeholder="What’s Your Email?"
            />
            <div className="cs_height_50 cs_height_lg_30" />
          </div>
          <div className="col-lg-12">
            <textarea
              cols={30}
              rows={7}
              className="cs_form_field_2"
              placeholder="Feel Free To Write Your Comment"
            />
            <div className="cs_height_60 cs_height_lg_30" />
          </div>
          <div className="col-lg-12 text-center">
            <button className="cs_btn cs_style_1">
              Post Comment{' '}
              <span>
                <i className="fa-solid fa-arrow-right" />
              </span>
            </button>
          </div>
        </form>
        <div className="cs_height_150 cs_height_lg_80" />
      </div>
    </>
  );
}
