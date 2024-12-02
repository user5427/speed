import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';

interface CategoryItemProps {
    data: {
        id: string; // Ensure each category has a unique id
        title: string;
        text: string;
    };
    settings?: {
        showSelectButton?: boolean;
        showDeleteButton?: boolean;
        showEditButton?: boolean;
        showPlayButton?: boolean;
    };
    selectThis?: () => void;
    deleteThis?: () => void;
    editThis?: () => void;
    playThis?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
    const { t } = useTranslation();
    const { settings, selectThis, deleteThis, editThis } = props;
    const [color, setColor] = useState<string>('#000000');

    useEffect(() => {
        setColor(generateColorFromId(props.data.title));
    }, [props.data.title]);

    const generateColorFromId = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).slice(-2);
        }
        return color;
    };

    // Handlers to prevent event propagation from buttons
    const handleContainerClick = () => {
        if (selectThis) selectThis();
    };

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (deleteThis) deleteThis();
    };

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (editThis) editThis();
    };

    return (
        <div 
            className="article-item" 
            style={{ backgroundColor: `${color}`, cursor: 'pointer' }} 
            onClick={handleContainerClick}
            role="button" // Accessibility: indicate that the div is clickable
            tabIndex={0} // Make it focusable
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleContainerClick();
                }
            }}
        >
            <Row className="rowCategories">
                <Col xs={12} md={10} className="col col-12 col-md-10">
                    <h2 className="wrap-title">{props.data.title}</h2>
                </Col>
            </Row>
            <Row className="rowCategories">
                <Col xs={12} md={2} className="col col-12 col-md-2">
                    <p className="wrap-category">{props.data.text}</p>
                </Col>
            </Row>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}> {/* Add gap and spacing */}
                {/* {settings && settings.showSelectButton && (
                    <Button 
                        onClick={handleContainerClick} 
                        className='buttons amber'
                        aria-label={t('commonUIelements.select')}
                    >
                        {t('commonUIelements.select')}
                    </Button>
                )} */}

                {settings && settings.showDeleteButton && (
                    <Button 
                        onClick={handleDeleteClick} 
                        className='buttons red'
                        aria-label={t('commonUIelements.delete')}
                    >
                        {t('commonUIelements.delete')}
                    </Button>
                )}

                {settings && settings.showEditButton && (
                    <Button 
                        onClick={handleEditClick} 
                        className='buttons lightBlue'
                        aria-label={t('commonUIelements.edit')}
                    >
                        <MdModeEdit className="icons" /> {t('commonUIelements.edit')}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CategoryItem;
