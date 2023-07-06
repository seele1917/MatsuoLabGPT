import {
    Card,
    createStyles,
    getStylesRef,
    rem,
  } from "@mantine/core";
  import { MouseEventHandler } from "react";
  import Image from "next/image";
  import { useMediaQuery } from "@mantine/hooks";
  
  const useStyles = createStyles((theme) => ({
    card: {
      position: "relative",
      height: rem(280),
      width: rem(280),
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
  
      [`&:hover .${getStylesRef("image")}`]: {
        transform: "scale(1.03)",
      },
    },
  
    image: {
      ...theme.fn.cover(),
      ref: getStylesRef("image"),
      transition: "transform 500ms ease",
      marginTop: rem(-9),
      marginLeft: rem(-6),
    },
  
    overlay: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, .85) 80%)",
    },
  
    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },
  
  }));
  
  interface ImageCardProps {
    image: string;
    style: any;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }
  
  export default function ImageCard({
    image,
    style,
    onClick,
  }: ImageCardProps) {
    const { classes, theme } = useStyles();
  
    const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  
    return (
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component="a"
        onClick={onClick}
        withBorder
        style={style}
      >
        <div className={classes.image}>
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33px"
            alt=""
            style={{ objectFit: isMd ? "cover" : undefined }}
          />
        </div>
        <div className={classes.overlay} />
      </Card>
    );
  }
  