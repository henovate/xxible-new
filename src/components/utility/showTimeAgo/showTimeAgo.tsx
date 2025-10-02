"use client"

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type showTimeProps = {
    dateAndTime: string | Date
}

const ShowTimeAgo = ({ dateAndTime }: showTimeProps) => {
    const [timeAgo, setTimeAgo] = useState<string>("");

    useEffect(() => {
        const updateTimeAgo = () => {
            const parsedDate = new Date(dateAndTime);
            if (!isNaN(parsedDate.getTime())) {
                setTimeAgo(formatDistanceToNow(parsedDate, { addSuffix: true }));
            } else {
                setTimeAgo("Invalid date");
            }
        };

        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 60000);
        return () => clearInterval(interval);

    }, [dateAndTime]);

    return (
        <>
            {timeAgo}
        </>
    );
};

export default ShowTimeAgo;