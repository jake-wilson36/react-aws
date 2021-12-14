import React, { useState } from 'react';
import { Row, Col, Card, Form, CardBody, CardTitle, CardSubtitle, Container } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import axios from '../../helpers/axiosutil';
import toaster from '../../helpers/toaster';
import DatePicker from "react-datepicker";
import s3aws from './s3aws'

//FormUploads function
const FormUploads = (props) => {

    const [selectedFiles, setselectedFiles] = useState([]);
    const [is_signature, SetIsSignature] = useState(false);
    const [signature_date, SetIsSignatureDate] = useState(new Date());

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleAcceptedFiles = async (files) => {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size).displaySize,
                sizeType: formatBytes(file.size).sizeType,
                filesize: formatBytes(file.size).filesize
            })
        );
        setselectedFiles(files);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return {
            displaySize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i],
            sizeType: sizes[i],
            filesize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
        }
    };


    const dataURItoBlob = (dataURI) => {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'application/png' });
        return blob;
    }
    const UploadFile = async () => {
        try {
            if (["Bytes", "KB"].includes(selectedFiles[0].sizeType) || (selectedFiles[0].filesize <= 11 && selectedFiles[0].sizeType == "MB")) {
                let files = selectedFiles;
                const filePath = props.data.option_id == 1 ? 'survey/' : 'installation/';
                // Create an object of formData 
                const formData = new FormData();
                // Update the formData object 
                formData.append("file", files[0], files[0].name.toLocaleLowerCase().replaceAll(" ", ""));
                formData.append("filePath", filePath);
                s3aws.UploadFile({filename : formData}, formData)
            } else {
                toaster.error("10MB Maximum for Attachment File Size is extremely low")
            }
        } catch (err) {
            toaster.error(err.message)
        }
    }


    return (
        <React.Fragment>
            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <Form>
                                <div className="custom-control custom-checkbox ml-2 mt-2 pr-2 w-100">
                                    <input type="checkbox"
                                        id="is_signature"
                                        checked={is_signature}
                                        name="is_signature"
                                        className="custom-control-input"
                                        onChange={() => SetIsSignature(is_signature == 0 ? 1 : 0)} />
                                    <label className="custom-control-label" htmlFor="is_signature">Do you want to upload Images?</label>
                                </div>
                                {is_signature &&
                                    <div>
                                        <Dropzone accept="image/*" onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles) }} >
                                            {({ getRootProps, getInputProps }) => (
                                                <div className="dropzone">
                                                    <div className="dz-message needsclick mt-2" {...getRootProps()} >
                                                        <input {...getInputProps()} />
                                                        <div className="mb-3">
                                                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                                        </div>
                                                        <h4>Drop files here or click to upload.</h4>
                                                        <h6>Accept only image file</h6>
                                                    </div>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {selectedFiles.length != 0 && <div className="dropzone-previews mt-3" id="file-previews" >
                                            {selectedFiles.map((f, i) => {
                                                return (
                                                    <Card
                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                        key={i + "-file"}
                                                    >
                                                        <div className="p-2">
                                                            <Row className="align-items-center">
                                                                <Col className="col-auto">
                                                                    <img
                                                                        data-dz-thumbnail=""
                                                                        height="80"
                                                                        className="avatar-sm rounded bg-light"
                                                                        alt={f.name}
                                                                        src="https://icons.iconarchive.com/icons/graphicloads/filetype/256/png-icon.png"
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <Link
                                                                        to="#"
                                                                        className="text-muted font-weight-bold"
                                                                    >
                                                                        {f.name}
                                                                    </Link>
                                                                    <p className="mb-0">
                                                                        <strong>{f.formattedSize != 0 && f.formattedSize}</strong>
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                        }

                                    </div>
                                }
                            </Form>

                            <div className="text-center mt-4">
                                <button type="button" disabled={selectedFiles.length == 0} onClick={() => UploadFile()} className="btn btn-primary waves-effect waves-light">Send Files</button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default FormUploads;
