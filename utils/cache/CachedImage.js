import React, { useEffect, useState, useRef } from 'react'

import { Image } from 'react-native'

import * as FileSystem from 'expo-file-system'

export const CachedImage = (props) => {
  const {
    source: { uri },
    cacheKey,
  } = props;
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`;

  const [imgURI, setImgURI] = useState(filesystemURI);

  const componentIsMounted = useRef(true);

  useEffect(() => {
    const loadImage = async ({ fileURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI);
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null);
            await FileSystem.downloadAsync(uri, fileURI);
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI);
          }
        }
      } catch (err) {
        console.log(); // eslint-disable-line no-console
        setImgURI(uri);
      }
    };

    loadImage({ fileURI: filesystemURI });

    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return (
    <Image
      {...props}
      source={{
        uri: imgURI,
      }}
    />
  );
};