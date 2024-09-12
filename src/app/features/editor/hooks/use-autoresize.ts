/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect } from "react";
import { fabric } from "fabric";

interface Props {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoresize = ({ canvas, container }: Props) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setWidth(width)
    canvas.setHeight(height)

    const center = canvas.getCenter();

    const zoomRation = 0.85;
    const localWorkspace = canvas
      .getObjects()
      .find((object) => object.name === "clip");

    //@ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    });

    const zoom = zoomRation * scale;

    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [autoZoom, canvas, container]);

  return { autoZoom };
};
