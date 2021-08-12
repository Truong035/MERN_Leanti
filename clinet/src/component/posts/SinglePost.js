import { Card, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import {Badge} from 'react-bootstrap'

import ActionButtons from './ActionButtons'
const SinglePost=({post:{_id,title,description,url,status}})=>(
    <>
    <Card className="shadow" border={
        status==="LEARNED" ? 'success' : status==="TO LEARN" ? 'warning' :'danger'
    }>          

        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                    <p className="post_tile"> {title} </p>
            
					<Badge
							pill
							variant={
								status === 'LEARNED'
									? 'success'
									: status === 'TO LEARN'
									? 'warning'
									: 'danger'
							}
						>
							{status}
						</Badge>
           
                    </Col>
                    <Col className="ml-1">
                    <ActionButtons url={url} _id={_id} />
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text> {description} </Card.Text>
        </Card.Body>
     
    </Card>
    </>
)
export default SinglePost
