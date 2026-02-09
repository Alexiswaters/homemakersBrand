import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

const IconCard = ({ iconName }) => {
    const [style, setStyle] = useState('outlined');
    const [color, setColor] = useState('black');
    const [size, setSize] = useState(null);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [svgContent, setSvgContent] = useState(null);
    const [isFilledAvailable, setIsFilledAvailable] = useState(false);
    const [showFilledMessage, setShowFilledMessage] = useState(false);
    const iconRef = useRef(null);
    const imageRef = useRef(null);

    // Fetch available sizes for this icon
    useEffect(() => {
        const fetchAvailableSizes = async () => {
            try {
                const response = await fetch('/iconSizes.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch icon sizes');
                }
                
                const sizesData = await response.json();
                const sizes = sizesData[iconName] || [];
                
                setAvailableSizes(sizes);
                
                // Set default size to the largest available
                if (sizes.length > 0 && !size) {
                    setSize(sizes[0]);
                }
            } catch (error) {
                console.error('Error fetching available sizes:', error);
                // Fallback to default sizes if fetch fails
                setAvailableSizes(['xxxl', 'xl', 'l', 'm']);
                setSize('xxxl');
            }
        };
        
        fetchAvailableSizes();
    }, [iconName, size]);

    // Check if filled style is available
    useEffect(() => {
        const checkFilledAvailability = async () => {
            if (!size) return; // Ensure size is set before checking

            try {
                const response = await fetch(`/icons/${iconName}-${size}-filled.svg`);
                setIsFilledAvailable(response.ok);
                setShowFilledMessage(!response.ok);
            } catch (error) {
                console.error('Error checking filled style availability:', error);
                setIsFilledAvailable(false);
                setShowFilledMessage(true);
            }
        };

        checkFilledAvailability();
    }, [iconName, size]);

    // Fetch SVG content when dependencies change
    useEffect(() => {
        if (!size) return; // Don't fetch if size isn't set yet
        
        let isMounted = true;
        
        const fetchSvg = async () => {
            try {
                const fileName = `${iconName}-${size}-${style}.svg`;
                const response = await fetch(`/icons/${fileName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch SVG: ${response.status}`);
                }
                
                let svgText = await response.text();
                
                // Always start with the original SVG and apply color replacement
                // Replace specific hex codes based on color selection
                if (color === 'white') {
                    // Replace black (#332A2A) with white (#FFFEFC) - handle all variations
                    // Use case-insensitive and handle both single and double quotes, or no quotes
                    svgText = svgText.replace(/#332A2A/gi, '#FFFEFC');
                    svgText = svgText.replace(/stroke=["']?#332A2A["']?/gi, 'stroke="#FFFEFC"');
                    svgText = svgText.replace(/fill=["']?#332A2A["']?/gi, 'fill="#FFFEFC"');
                } else {
                    // Replace white (#FFFEFC) with black (#332A2A) - handle all variations
                    svgText = svgText.replace(/#FFFEFC/gi, '#332A2A');
                    svgText = svgText.replace(/stroke=["']?#FFFEFC["']?/gi, 'stroke="#332A2A"');
                    svgText = svgText.replace(/fill=["']?#FFFEFC["']?/gi, 'fill="#332A2A"');
                }
                
                if (isMounted) {
                    setSvgContent(svgText);
                }
            } catch (error) {
                console.error(`Error fetching SVG for ${iconName}:`, error);
            }
        };

        fetchSvg();
        
        return () => {
            isMounted = false;
        };
    }, [iconName, size, style, color]); // Removed svgFileName, added style directly

    const downloadPNG = (event) => {
        event.preventDefault();
        if (imageRef.current) {
            const element = imageRef.current;
            const scale = window.devicePixelRatio || 1;

            html2canvas(element, {
                scale: scale * 5,
                backgroundColor: null,
                logging: true,
                useCORS: true,
                allowTaint: true,
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png', 1.0);
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `${iconName}-${size}-${style}.png`;
                link.click();
            });
        }
    };

    const downloadSVG = (event) => {
        event.preventDefault();
        
        // Create a Blob from the modified SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${iconName}-${size}-${style}.svg`;
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    };

    const downloadJPG = (event) => {
        event.preventDefault();
        if (imageRef.current) {
            const element = imageRef.current;
            const scale = window.devicePixelRatio || 1;

            // Set background color based on the selected icon color
            const backgroundColor = color === 'white' ? 'black' : 'white'; // Black for white icon, white for black icon

            html2canvas(element, {
                scale: scale * 5,
                backgroundColor: backgroundColor, // Use the determined background color
                logging: true,
                useCORS: true,
                allowTaint: true,
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `${iconName}-${size}-${style}.jpg`;
                link.click();
            });
        }
    };

    // Format the icon name for display (convert camelCase to Title Case with spaces)
    const formatIconName = (name) => {
        // Add space before capital letters and capitalize the first letter
        const formatted = name.replace(/([A-Z])/g, ' $1').trim();
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    return (
        <div className="icon-card" ref={iconRef}>
            <div 
                className="icon-image-container" 
                style={{ backgroundColor: color === 'white' ? '#332A2A' : 'transparent' }}
            >
                {svgContent ? (
                    <div 
                        ref={imageRef}
                        className="icon-image"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                ) : (
                    <div className="loading">Loading...</div>
                )}
            </div>
            
            <h4 className="icon-title">{formatIconName(iconName)}</h4>
            
            {showFilledMessage && (
                <div className="filled-message" style={{ textAlign: 'center', color: 'red' }}>
                    This icon doesn't have a filled style
                </div>
            )}
            
            {availableSizes.length > 0 && (
                <div className="size-selection">
                    <div className="size-options">
                        {availableSizes.map((sizeOption) => (
                            <label key={sizeOption} className="size-option">
                                <input
                                    type="radio"
                                    value={sizeOption}
                                    checked={size === sizeOption}
                                    onChange={() => setSize(sizeOption)}
                                    className="hidden"
                                />
                                <span className={`custom-radio ${size === sizeOption ? 'selected' : ''}`}>
                                    {sizeOption.toUpperCase()}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="style-controls-container">
                <div className="style-container">
                    <label className="option-button">
                        <input
                            type="radio"
                            value="outlined"
                            checked={style === 'outlined'}
                            onChange={() => {
                                setStyle('outlined');
                                setShowFilledMessage(false);
                            }}
                            className="hidden"
                        />
                        <span className={`custom-radio ${style === 'outlined' ? 'selected' : ''}`}>
                            OUTLINED
                        </span>
                    </label>
                    <label className="option-button">
                        <input
                            type="radio"
                            value="filled"
                            checked={style === 'filled'}
                            onChange={() => {
                                setStyle('filled');
                                setShowFilledMessage(false);
                            }}
                            className="hidden"
                            disabled={!isFilledAvailable}
                        />
                        <span className={`custom-radio ${style === 'filled' ? 'selected' : ''}`}>
                            FILLED
                        </span>
                    </label>
                </div>
                <div className="color-container">
                    <label className="option-button">
                        <input
                            type="radio"
                            value="black"
                            checked={color === 'black'}
                            onChange={() => setColor('black')}
                            className="hidden"
                        />
                        <span className={`custom-radio ${color === 'black' ? 'selected' : ''}`}>
                            BLACK
                        </span>
                    </label>
                    <label className="option-button">
                        <input
                            type="radio"
                            value="white"
                            checked={color === 'white'}
                            onChange={() => setColor('white')}
                            className="hidden"
                        />
                        <span className={`custom-radio ${color === 'white' ? 'selected' : ''}`}>
                            WHITE
                        </span>
                    </label>
                </div>
            </div>
            
            <div className="download-button-container">
                <button className="button" onClick={downloadPNG}>
                    <img src="https://cdn.homemakers.com/download_gray.svg" alt="Download PNG" className="button-icon" />
                    PNG
                </button>
                <button className="button" onClick={downloadJPG}>
                    <img src="https://cdn.homemakers.com/download_gray.svg" alt="Download JPG" className="button-icon" />
                    JPG
                </button>
                <button className="button" onClick={downloadSVG}>
                    <img src="https://cdn.homemakers.com/download_gray.svg" alt="Download SVG" className="button-icon" />
                    SVG
                </button>
            </div>
        </div>
    );
};

export default IconCard;
