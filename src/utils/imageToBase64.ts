/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Utility: imageToBase64
 * Purpose: Convert images to base64 for PDF embedding
 * Why Needed: jsPDF requires base64 format for image embedding
 */

// Default avatar as base64 - a simple user icon
export const DEFAULT_AVATAR_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH5gEGDyAKMqN3/QAAA+lJREFUWMPtmE1oHFUYx3/vzOzs7GY3u0k2H01im6YxqVqrVqsWPHjwIChCQfBQPHjw4EXEg+jFg4IHQfDgRUEQBEEQBA+CIAiCBw8ePHjQg1CttbZJmjRpkt3Nfszsfry3h9lNNrubzWZjD4L5w7DM+973vv/7/+Z973tvBv5f/xsVXcv8/v7+gUQicTgajR6ORCKHdF0/FAgE9jiOY1uWlbMs63o+n7+Uy+Uu5nK5i4lE4srU1FS1U9td27EsywSDwYNDQ0PPDg8PPxOLxfbGYrGBaDQa7u/v71VVVQCo1+tUq1VKpRKFQoFMJkMqleLOnTuL6XT6VCqVOjU7O3t6ampqo1Mb2wJalkVfX9/BkZGRl0dHR1+MRqN7BgYGBvv6+sKapnlvVqtVSqUSxWKRbDZLKpVicXFxPplMfp9MJn+Ym5tbWq/1TIDxeHwwHA4/Pzo6+sbw8PCRgYGBwWAw2GMYhg9AVVVUVcXv9xMIBAgGgwwODrK+vk4ikWBhYWE+kUh8s7Cw8PXc3FyqHTvKLlcKh8PPj42NvT06OnokFosNBgKBHsMw/KqqtjzY+SyXy2QyGVKpFMlk8k4ikfh8YWHhq2aQuwZ0Puvv7388Ho+/Nj4+fnRoaGhXIBDoMU3Tr6rqlpdarUa5XKZYLJLNZkkmk7fn5+e/nJ+f/2J2dna11f1dAY6Pj4d1XX8qHo+/OTExcTQejw8HAgFrO3DN60kzxnQ6zfLy8p3FxcUvFhYWPpmdnV1rtNUx4NTUlBKLxfYNDw+/MTEx8fro6OieYDDYY1lWT7vVa66iVqtRqVQol8tks1kSicTt+fn5jxcWFj5dXFysAR0D2rbNxMTEa/F4/K3x8fG91l/LtIQCIqJQKJRSJvOXmJk5L0qlFSml9MqyRDgcDu/t7e19dmho6E4qlcp0dA/a1z+lT1VjxCJBwr0miqIAsC4cCJQxLPJzP6k/L/ycy2azGaBT3x0BKqFQaJemaQciPWHGRoYw/TqKosD6BoTDUCjAygqVyhJRgzJwqtM5TA/6/f5hw9R7A5bJ+PAuALR0HQy/N38GQhZCCMpCkBEVoOnP90HQnstms/trtdro2MO7sXQNAQz4DYRo3XbTqP9xoiRFmSHQtwu03kkxEokM5/P5kXjAyySPbhTqK0JTnlZFjUqzXNOo5VJM/5XmxdoVzsoz5Aq5pLv9HuB1Ph6PC9O0eiPW0D3DJgLo1dT2sUJQ0lRSPpOAqTPrLxBJJCIbq6ul7QD6dF23dF03FVVrCweA3n40NQGrBaj7B1ByOVi7C9Ag0HfDXM9WygAAAABJRU5ErkJggg==';

/**
 * Convert image URL to base64
 * Note: This requires the image to be loaded in the browser first
 */
export async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return DEFAULT_AVATAR_BASE64;
  }
}