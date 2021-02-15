import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Col } from 'react-bootstrap';

const PropertiesPreloader = (listView) => {
  console.log(listView);
  return (
    <>
      {listView ? (
        <>
          <Col md="6">
            <SkeletonTheme
              color="#F2F3F4"
              highlightColor="#fff"
              className="skeleton"
            >
              <div className="skeleton">
                <Skeleton height={230} />
                <div className="skeleton__card-body">
                  <Skeleton
                    height={26}
                    width={172}
                    className="skeleton__location"
                  />
                  <Skeleton
                    height={26}
                    width={241}
                    className="skeleton__features"
                  />
                  <div className="skeleton__author author">
                    <div className="author__icon">
                      <Skeleton circle={true} height={60} width={60} />
                    </div>
                    <div className="author__info">
                      <Skeleton height={26} width={88} />
                      <Skeleton height={26} width={152} />
                    </div>
                  </div>
                  <div className="skeleton__buttons">
                    <Skeleton height={20} width={60} />
                    <Skeleton height={50} width={150} />
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          </Col>
          <Col md="6">
            <SkeletonTheme
              color="#F2F3F4"
              highlightColor="#fff"
              className="skeleton"
            >
              <div className="skeleton">
                <Skeleton height={230} />
                <div className="skeleton__card-body">
                  <Skeleton
                    height={26}
                    width={172}
                    className="skeleton__location"
                  />
                  <Skeleton
                    height={26}
                    width={241}
                    className="skeleton__features"
                  />
                  <div className="skeleton__author author">
                    <div className="author__icon">
                      <Skeleton circle={true} height={60} width={60} />
                    </div>
                    <div className="author__info">
                      <Skeleton height={26} width={88} />
                      <Skeleton height={26} width={152} />
                    </div>
                  </div>
                  <div className="skeleton__buttons">
                    <Skeleton height={20} width={60} />
                    <Skeleton height={50} width={150} />
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          </Col>
          <Col md="6">
            <SkeletonTheme
              color="#F2F3F4"
              highlightColor="#fff"
              className="skeleton"
            >
              <div className="skeleton">
                <Skeleton height={230} />
                <div className="skeleton__card-body">
                  <Skeleton
                    height={26}
                    width={172}
                    className="skeleton__location"
                  />
                  <Skeleton
                    height={26}
                    width={241}
                    className="skeleton__features"
                  />
                  <div className="skeleton__author author">
                    <div className="author__icon">
                      <Skeleton circle={true} height={60} width={60} />
                    </div>
                    <div className="author__info">
                      <Skeleton height={26} width={88} />
                      <Skeleton height={26} width={152} />
                    </div>
                  </div>
                  <div className="skeleton__buttons">
                    <Skeleton height={20} width={60} />
                    <Skeleton height={50} width={150} />
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          </Col>
          <Col md="6">
            <SkeletonTheme
              color="#F2F3F4"
              highlightColor="#fff"
              className="skeleton"
            >
              <div className="skeleton">
                <Skeleton height={230} />
                <div className="skeleton__card-body">
                  <Skeleton
                    height={26}
                    width={172}
                    className="skeleton__location"
                  />
                  <Skeleton
                    height={26}
                    width={241}
                    className="skeleton__features"
                  />
                  <div className="skeleton__author author">
                    <div className="author__icon">
                      <Skeleton circle={true} height={60} width={60} />
                    </div>
                    <div className="author__info">
                      <Skeleton height={26} width={88} />
                      <Skeleton height={26} width={152} />
                    </div>
                  </div>
                  <div className="skeleton__buttons">
                    <Skeleton height={20} width={60} />
                    <Skeleton height={50} width={150} />
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          </Col>
        </>
      ) : (
        <Col md="6">
          <SkeletonTheme
            color="#F2F3F4"
            highlightColor="#fff"
            className="skeleton"
          >
            <div className="skeleton">
              <Skeleton height={230} />
              <div className="skeleton__card-body">
                <Skeleton
                  height={26}
                  width={172}
                  className="skeleton__location"
                />
                <Skeleton
                  height={26}
                  width={241}
                  className="skeleton__features"
                />
                <div className="skeleton__author author">
                  <div className="author__icon">
                    <Skeleton circle={true} height={60} width={60} />
                  </div>
                  <div className="author__info">
                    <Skeleton height={26} width={88} />
                    <Skeleton height={26} width={152} />
                  </div>
                </div>
                <div className="skeleton__buttons">
                  <Skeleton height={20} width={60} />
                  <Skeleton height={50} width={150} />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </Col>
      )}
    </>
  );
};

// TODO: style skeleton for list view

export default PropertiesPreloader;
