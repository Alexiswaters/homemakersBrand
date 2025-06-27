import React, { useState, useEffect, useRef } from 'react';

const SortAndSearch = ({ icons, setSortedIcons }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('alphabetical');
    const containerRef = useRef(null);
    const [filteredCount, setFilteredCount] = useState(icons.length); // Initialize with total icon count

    // Apply filtering and sorting whenever search term, sort option, or icons change
    useEffect(() => {
        let filteredIcons = [...icons]; // Create a copy to avoid mutating the original
        
        // Apply search filter if there's a search term
        if (searchTerm.trim() !== '') {
            filteredIcons = filteredIcons.filter(icon => 
                icon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Update the filtered count
        setFilteredCount(filteredIcons.length);

        // Apply sorting
        if (sortOption === 'alphabetical') {
            filteredIcons.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'recently-added') {
            filteredIcons.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
        
        // Update the sorted icons in the parent component
        setSortedIcons(filteredIcons);
        
    }, [searchTerm, sortOption, icons, setSortedIcons]);

    // Add intersection observer to detect when container becomes sticky
    useEffect(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        const containerTop = container.offsetTop;
        
        const handleScroll = () => {
            if (window.pageYOffset > containerTop) {
                container.classList.add('sticky');
            } else {
                container.classList.remove('sticky');
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOption(value);
    };

    return (
        <div className="sort-and-search-container" ref={containerRef}>
            <div className="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search icons..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    className="search-input"
                />
                <span className="icon-count">{filteredCount} icon{filteredCount !== 1 ? 's' : ''} found</span>
            </div>
            <select value={sortOption} onChange={handleSortChange} className="sort-select">
                <option value="alphabetical">Sort Alphabetically</option>
                <option value="recently-added">Sort by Recently Added</option>
            </select>
        </div>
    );
};

export default SortAndSearch;
