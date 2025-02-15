import React, { useRef } from 'react';
import { Button } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import Template1 from '../components/resume-templates/Template1';
import Template2 from '../components/resume-templates/Template2';

function Preview(props) {
    const componentRef = useRef();
    const resume = props.location.state.resume;
    resume.personalPicture = resume.personalPicture && !(resume.personalPicture == "") ? resume.personalPicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhgREKJpawVaEkD5aRXudpG-Q3gec7qWcSA&usqp=CAU";
    let Template = <h1>Unknown template</h1>;

    switch(resume.template) {
        case "Template1":
            Template = <Template1 resume={resume} />;
            break;
        case "Template2":
            Template = <Template2 resume={resume} />;
            break ;
    }

    return (
        <div>
            <div className="text-center mb-5">
                <ReactToPrint
                    trigger={() => <Button>Download Resume</Button>}
                    content={() => componentRef.current}
                />
            </div>
            <div ref={componentRef}>
                {Template}
            </div>
        </div>
    )
}

export default Preview;
