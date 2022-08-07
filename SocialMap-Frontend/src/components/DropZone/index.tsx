import React, { useState, useCallback } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useDropzone } from 'react-dropzone';

import './index.css'

interface Props {
    onFileUploaded: (file: File) => void;
}

function DropZone({ onFileUploaded }: Props) {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles: any[]) => {
            const file = acceptedFiles[0];

            const fileUrl = URL.createObjectURL(file);
            setSelectedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ?
                (<div className='DropImageWithImage'>
                    <img className="imageSelected" src={selectedFileUrl} alt='Point thumbnail' />
                </div>)
                :
                (<div className='DropImage'>
                    <ImageIcon style={{ fontSize: '50px' }} />
                    <h3>Selecione sua imagem</h3>
                </div>)}
        </div>
    );
}

interface IProps {
    onFileUploaded: (file: File) => void;
    midia: string | undefined;
}

export function DropZoneEdit({ onFileUploaded, midia }: IProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles: any[]) => {
            const file = acceptedFiles[0];

            const fileUrl = URL.createObjectURL(file);
            setSelectedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ?
                <img className="ImageEdit" src={selectedFileUrl} alt='Point thumbnail' />
                :
                (midia ?
                    <img src={midia} alt="profile" className="ImageEdit" />
                    :
                    <div>
                        <ImageIcon style={{ fontSize: '50px' }} />
                    </div>
                )
            }
        </div>
    );
}


export default DropZone;