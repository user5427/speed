import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Articles/articleItemStyle.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';

interface CategoryItemProps {
    data: {
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
    }, [props.data]);


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




    return (
        <>
            <div className="article-item">
                <Row className="rowCategories">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <h2 className="wrap-title">{props.data.title}</h2>

                    </Col>
                </Row>
                <Row className="rowCategories">
                    <Col xs={12} md={10} className="col col-12 col-md-10">
                        <div className="article-item" style={{ backgroundColor: `${color}` }}>
                        </div>
                    </Col>
                </Row>
                <Row className="rowCategories">
                    <Col xs={12} md={2} className="col col-12 col-md-2">
                        <p className="wrap-category">{props.data.text}</p>
                    </Col>
                </Row>

                <div style={{ display: 'flex', gap: '10px' }}> {/* Add gap between buttons */}

                    {settings && settings.showSelectButton && (
                        <div> {/* Flex for each button container */}
                            <Button onClick={selectThis} className='buttons amber'>
                                {t('commonUIelements.select')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showDeleteButton && (
                        <div>
                            <Button onClick={deleteThis} className='buttons red'>
                                {t('commonUIelements.delete')}
                            </Button>
                        </div>
                    )}

                    {settings && settings.showEditButton && (
                        <div>
                            <Button onClick={editThis} className='buttons lightBlue'>
                                <MdModeEdit className="icons" /> {t('commonUIelements.edit')}
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );

}

export default CategoryItem;