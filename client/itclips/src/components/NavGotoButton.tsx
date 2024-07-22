import React from 'react';

// Define the interface for the component's props
interface NavGotoButtonProps {
    path: string;
    name: string;
}

// Use the interface to type the props parameter
const NavGotoButton: React.FC<NavGotoButtonProps> = (props) => {
    return (
        <li>
            <a href={`/${props.path}`} className="transition-colors duration-300 hover:text-gray-400">
                {props.name}
            </a>
        </li>
    );
}

export default NavGotoButton;