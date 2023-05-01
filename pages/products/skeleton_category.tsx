import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonCategory = () => {
    return (
        <div>
            <Skeleton variant="rectangular" animation="wave" width={210} height={118} />
                <h3>Second Screen</h3>
            <Skeleton variant="text" animation="wave" />
        </div>
    );
};

export default SkeletonCategory;