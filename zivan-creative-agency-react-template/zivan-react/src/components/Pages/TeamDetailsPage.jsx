import React from 'react';
import Spacing from '../Spacing';
import SectionHeadingStyle3 from '../SectionHeading/SectionHeadingStyle3';
import ProgressBar from '../ProgressBar';
import { pageTitle } from '../../helpers/PageTitle';

export default function TeamDetailsPage() {
  pageTitle('Team Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="James Berline"
        subTitle="React Developer"
        shape="shape_3"
      />
      <Spacing lg="75" md="60" />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <img
                src="/images/others/team_details_1.jpeg"
                alt="Member"
                className="w-100"
              />
            </div>
            <div className="col-xl-6 offset-xl-1">
              <Spacing lg="50" md="30" />
              <h2 className="cs_fs_38">Bio & experience</h2>
              <p>
                Meet James Berline, a skilled React developer based in the USA.
                With years of more experience and a passion for building
                exceptional web applications, James Berline has become an expert
                in the field. As a freelance developer, they have worked with
                clients from around the world, delivering high-quality solutions
                that exceed her limit expectations. In their free time, James
                Berline enjoys exploring new technologies and mentoring junior
                developers. She love also song writing.
              </p>
              <p>
                Versatile developer with expertise in React and front-end
                development. He also have nice extensive experience with SQL
                databases. With a strong work ethic and attention to detail,
                they deliver high-quality solutions that exceed expectations.
              </p>
              <Spacing lg="15" md="15" />
              <ProgressBar title="React Development" percentage="75" />
              <ProgressBar title="Front-End Development" percentage="85" />
              <ProgressBar title="Sql Database" percentage="80" />
            </div>
          </div>
        </div>
      </section>
      <Spacing lg="150" md="80" />
    </>
  );
}
