import React from 'react';
import { Col, Row } from 'reactstrap';

const BreadCrumb = (props: any) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{props.title}</h4>
                    </div>
                </Col>
            </Row>

        </React.Fragment >
    );
};

export default BreadCrumb;