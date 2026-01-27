import React, { useEffect, useRef, useState, useMemo } from 'react';
import IconCard from './IconCard'; // Import the IconCard component
import SortAndSearch from './SortAndSearch';

const App = () => {
    const originalIcons = useMemo(() => [
        { name: 'star', dateAdded: '2023-01-01' },
        { name: 'megaphone', dateAdded: '2023-01-02' },
        { name: 'giveaway', dateAdded: '2023-01-03' },
        { name: 'houseCamera', dateAdded: '2023-01-04' },
        { name: 'cookie', dateAdded: '2023-01-05' },
        { name: 'phoneSocial', dateAdded: '2023-01-06' },
        { name: 'diningChair', dateAdded: '2023-01-07' },
        { name: 'outdoorBeach', dateAdded: '2023-01-08' },
        { name: 'shoppingBag', dateAdded: '2023-01-09' },
        { name: 'voteLike', dateAdded: '2023-01-10' },
        { name: 'cart', dateAdded: '2023-01-12' },
        { name: 'favorite', dateAdded: '2023-01-12' },
        { name: 'addFavorite', dateAdded: '2023-01-11' },
        { name: 'chevronLeft', dateAdded: '2023-01-12' },
        { name: 'chevronUp', dateAdded: '2023-01-12' },
        { name: 'chevronRight', dateAdded: '2023-01-12' },
        { name: 'chevronDown', dateAdded: '2023-01-12' },
        { name: 'error', dateAdded: '2023-01-12' },
        { name: 'swatches', dateAdded: '2023-01-12' },
        { name: 'help', dateAdded: '2023-01-12' },
        { name: 'locationMarker', dateAdded: '2023-01-12' },
        { name: 'addLocationMarker', dateAdded: '2023-01-12' },
        { name: 'editLocationMarker', dateAdded: '2023-01-12' },
        { name: 'customize', dateAdded: '2023-01-12' },
        { name: 'account', dateAdded: '2023-01-12' },
        { name: 'width', dateAdded: '2023-01-12' },
        { name: 'depth', dateAdded: '2023-01-12' },
        { name: 'orderHistory', dateAdded: '2023-01-12' },
        { name: 'delivery', dateAdded: '2023-01-12' },
        { name: 'dropship', dateAdded: '2023-01-12' },
        { name: 'email', dateAdded: '2023-01-12' },
        { name: 'calendar', dateAdded: '2023-01-12' },
        { name: 'addCalendar', dateAdded: '2023-01-12' },
        { name: 'bedroomDresser', dateAdded: '2023-01-12' },
        { name: 'livingRoomSofa', dateAdded: '2023-01-12' },
        { name: 'homeDecorLamp', dateAdded: '2023-01-12' },
        { name: 'livingRoomStiltedDresser', dateAdded: '2023-01-12' },
        { name: 'livingRoomLoveseat', dateAdded: '2023-01-12' },
        { name: 'sun', dateAdded: '2023-01-12' },
        { name: 'customerService', dateAdded: '2023-01-12' },
        { name: 'shield', dateAdded: '2023-01-12' },
        { name: 'addToCart', dateAdded: '2023-01-13' },
        { name: 'closeCircle', dateAdded: '2023-01-13' },
        { name: 'close', dateAdded: '2023-01-13' },
        { name: 'addCircle', dateAdded: '2023-01-13' },
        { name: 'subtractCircle', dateAdded: '2023-01-13' },
        { name: 'add', dateAdded: '2023-01-13' },
        { name: 'subtract', dateAdded: '2023-01-13' },
        { name: 'paymentMethod', dateAdded: '2023-01-15' },
        { name: 'addPaymentMethod', dateAdded: '2023-01-15' },
        { name: 'creditCard', dateAdded: '2023-01-15' },
        { name: 'giftCard', dateAdded: '2023-01-15' },
        { name: 'arrowLeft', dateAdded: '2023-01-16' },
        { name: 'arrowRight', dateAdded: '2023-01-16' },
        { name: 'arrowUp', dateAdded: '2023-01-16' },
        { name: 'arrowDown', dateAdded: '2023-01-16' },
        { name: 'signOut', dateAdded: '2023-01-15' },
        { name: 'customerAssembly', dateAdded: '2023-01-17' },
        { name: 'customerAssemblyRequiredSemantic', dateAdded: '2023-01-17' },
        { name: 'customerAssemblyRequired', dateAdded: '2023-01-17' },
        { name: 'payMyBill', dateAdded: '2023-01-17' },
        { name: 'recentlyViewed', dateAdded: '2023-01-17' },
        { name: 'upload', dateAdded: '2023-01-17' },
        { name: 'download', dateAdded: '2023-01-17' },
        { name: 'business', dateAdded: '2023-01-17' },
        { name: 'delete', dateAdded: '2023-01-17' },
        { name: 'dashboard', dateAdded: '2023-01-17' },
        { name: 'arrowBlock', dateAdded: '2023-01-17' },
        { name: 'priceTag', dateAdded: '2023-01-17' },
        { name: 'search', dateAdded: '2023-01-17' },
        { name: 'checkmark', dateAdded: '2023-01-17' },
        { name: 'checkmarkCircle', dateAdded: '2023-01-17' },
        { name: 'checkmarkCircleSemantic', dateAdded: '2023-01-17' },
        { name: 'camera', dateAdded: '2023-01-17' },
        { name: 'livingRoomConsole', dateAdded: '2023-01-17' },
        { name: 'livingRoomRecliner', dateAdded: '2023-01-17' },
        { name: 'kitchenPantry', dateAdded: '2023-01-17' },
        { name: 'team', dateAdded: '2023-01-17' },
        { name: 'menu', dateAdded: '2023-01-17' },
        { name: 'snowflake', dateAdded: '2023-01-17' },
        { name: 'flower', dateAdded: '2023-01-17' },
        { name: 'usa', dateAdded: '2023-01-19' },
        { name: 'mattressCoil', dateAdded: '2023-01-19' },
        { name: 'sleep', dateAdded: '2023-01-19' },
        { name: 'support', dateAdded: '2023-01-19' },
        { name: 'extraFirm', dateAdded: '2023-01-19' },
        { name: 'firm', dateAdded: '2023-01-19' },
        { name: 'medium', dateAdded: '2023-01-19' },
        { name: 'plush', dateAdded: '2023-01-19' },
        { name: 'extraPlush', dateAdded: '2023-01-19' },
        { name: 'mattressKing', dateAdded: '2023-01-19' },
        { name: 'mattressQueen', dateAdded: '2023-01-19' },
        { name: 'mattressFull', dateAdded: '2023-01-19' },
        { name: 'mattressTwinXl', dateAdded: '2023-01-19' },
        { name: 'mattressTwin', dateAdded: '2023-01-19' },
        { name: 'mattressFirmnessExtraPlush', dateAdded: '2023-01-19' },
        { name: 'mattressFirmnessPlush', dateAdded: '2023-01-19' },
        { name: 'mattressFirmnessMedium', dateAdded: '2023-01-19' },
        { name: 'mattressFirmnessFirm', dateAdded: '2023-01-19' },
        { name: 'mattressFirmnessExtraFirm', dateAdded: '2023-01-19' },
        { name: 'coilSupport', dateAdded: '2023-01-19' },
        { name: 'adjustableBaseFriendly', dateAdded: '2023-01-21' },
        { name: '120NightGuarantee', dateAdded: '2023-01-21' },
        { name: 'mattressCooling', dateAdded: '2023-01-21' },
        { name: 'hybridSupport', dateAdded: '2023-01-21' },
        { name: 'mattress', dateAdded: '2023-01-21' },
        { name: 'mattressInABox', dateAdded: '2023-01-21' },
        { name: 'gears', dateAdded: '2023-01-21' },
        { name: 'shiftingGears', dateAdded: '2023-01-21' },
        { name: 'mattressUpcycle', dateAdded: '2023-01-22' },
        { name: 'news', dateAdded: '2023-01-22' },
        { name: 'magnify', dateAdded: '2023-01-23' },
        { name: 'locked', dateAdded: '2023-05-22' },
        { name: 'unlocked', dateAdded: '2023-05-23' },
        { name: 'share', dateAdded: '2023-05-26' },
        { name: 'edit', dateAdded: '2023-05-27' },
        { name: 'link', dateAdded: '2025-09-18' },
        { name: 'escalator', dateAdded: '2025-09-25' },
        { name: 'elevatorButtons', dateAdded: '2025-09-25' },
        { name: 'printer', dateAdded: '2025-09-26' },
        { name: 'groundCoffee', dateAdded: '2025-09-26' },
        { name: 'powered', dateAdded: '2025-10-31' },
        { name: 'wirelessCharging', dateAdded: '2025-11-4' },
        { name: 'usb', dateAdded: '2025-11-4' },
        { name: 'zeroGravity', dateAdded: '2025-11-4' },
        { name: 'heatMassage', dateAdded: '2025-12-1' },
        { name: 'heat', dateAdded: '2025-12-1' },
        { name: 'dropDownTray', dateAdded: '2025-12-1' },
        { name: 'whisperingSeats', dateAdded: '2026-01-26' },
        { name: 'bluetooth', dateAdded: '2026-01-27' },
        // Add more icons as needed
    ], []);

    const [sortedIcons, setSortedIcons] = useState(originalIcons);
    const gridRef = useRef(null);
    const observerRef = useRef(null);
    
    // Set up the Intersection Observer
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cardElement = entry.target;
                    const cards = Array.from(document.querySelectorAll('.icon-card'));
                    const cardIndex = cards.indexOf(cardElement);
                    
                    const cardWidth = cardElement.offsetWidth;
                    const gridWidth = gridRef.current.offsetWidth;
                    const cardsPerRow = Math.floor(gridWidth / (cardWidth + 11));
                    
                    const rowPosition = cardIndex % cardsPerRow;
                    const delay = rowPosition * 0.1;
                    
                    cardElement.style.animationDelay = `${delay}s`;
                    cardElement.classList.add('animate');
                    
                    observer.unobserve(cardElement);
                }
            });
        };
        
        observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
        
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);
    
    // Observe cards whenever sortedIcons changes
    useEffect(() => {
        if (!gridRef.current || !observerRef.current) return;
        
        // Reset animation classes on all cards
        const allCards = gridRef.current.querySelectorAll('.icon-card');
        allCards.forEach(card => {
            card.classList.remove('animate');
            card.style.animationDelay = '0s';
        });
        
        // Start observing all icon cards
        setTimeout(() => {
            const cards = gridRef.current.querySelectorAll('.icon-card');
            cards.forEach(card => {
                observerRef.current.observe(card);
            });
        }, 100); // Small delay to ensure DOM is updated
        
    }, [sortedIcons]);
    
    return (
        <div className="instructions">
            {/* Background blobs */}
            <div className="background-container">
                <div className="blob"></div>
                <div className="blob"></div>
                <div className="blob"></div>
            </div>
            
            <div className="text-container">
                <h1 className="text-2xl font-bold mb-4 text-left">Homemakers Icon Set</h1>
                <h3 className="h3">Guidelines for use</h3>
                <p>Homemakers icons can be used across the entire company for marketing, in-store signage, website and app use as well. Please keep in mind the few rules below when deciding what version to download.</p>
                <ul className='list'>
                    <li>Use icons responsibly and ensure they align with the brand's visual identity.</li>
                    <li>Do not alter the colors of the fill but the stroke can be modified to be gray if necessary.</li>
                    <li>If smaller sizes aren't shown, that icon shouldn't be reduced in size manually.</li>
                    <li>If you need a larger size than 44x44 (XXXL) download the SVG and scale accordingly.</li>
                    <li>PNGs and JPGs should not be used for print advertisement and only for web marketing purposes.</li>
                </ul>
            </div>

            <div className="icons-container">
                <SortAndSearch icons={originalIcons} setSortedIcons={setSortedIcons} />
                <h4 className="animated-entrance">SIZES: <strong>XXXL</strong> = 44x44px | <strong>XL</strong> = 28x28px | <strong>L</strong> = 23x23px | <strong>M</strong> = 18x18px | <strong>S</strong> = 15x15px | <strong>XS</strong> = 11x11px</h4>
                <div className="grid" ref={gridRef}>
                    {sortedIcons.map((icon) => (
                        <IconCard key={icon.name} iconName={icon.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;