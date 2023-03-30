# TikTok Pixel Tracker for React

This is a lightweight package that enables TikTok Pixel tracking on React-based websites or apps. With this package, you can easily track various user events, such as page views, clicks, purchases, and more, without having to manually add scripts to your HTML files.

## Installation

To install the package, simply run the following command:

```
yarn add react-tiktok-pixel
```

## Usage

To use this package, here's an example:

```typescript
import React, { FC } from "react";
import tiktokPixelHandler from "react-tiktok-pixel";
// or import { tiktokPixelHandler } from "react-tiktok-pixel";

export const TIKTOK_PIXEL_ID = "123456789";

export const MyComponent: FC = () => {
  const handleClick = () => {
    // creating a simple event
    tiktokPixelHandler.setTracking({
      tracking: "CompleteRegistration",
      data: {
        // just making a random number for the sake of the example, you can use userid or any other unique identifier
        content_id: String(~~(Math.random() * 0xffffff)),
      },
      // if you want this tracker inside an instance you can add it here
      // instance: "sideTwo",
    });
  };

  useEffect(() => {
    tiktokPixelHandler.init(TIKTOK_PIXEL_ID);
  }, []);

  return (
    <div>
      <h1>React tiktok pixel</h1>
      <button onClick={() => handleClick()}>Create an event</button>
    </div>
  );
};
```

you can also get the original pixel object:

```typescript
const ttq = tiktokPixelHandler.getTracker();
```

or change pixel tag if needed:

```typescript
tiktokPixelHandler.setPixelTag("ttg"); // ttq is default
```

For a full list of available methods and parameters, please refer to the documentation.

# Contributing

If you find a bug or want to suggest an improvement, please open an issue or a pull request on GitHub. We welcome contributions from the community!

# License

This package is released under the MIT License.
