"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

type TimeAgoProps = {
  date: Date | string;
};

const TimeAgo = ({ date }: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    // This runs only on the client, avoiding hydration mismatch
    const time = formatDistanceToNow(new Date(date), { addSuffix: true });
    setTimeAgo(time);
  }, [date]);

  // Render the formatted time once it's available
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
