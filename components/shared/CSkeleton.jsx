import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CSkeleton({ height, duration, width }) {
  return (
    <SkeletonTheme color='#c9c9c9' highlightColor='#f5f5f5'>
      <p>
        <Skeleton
          duration={duration || 1.4}
          height={height}
          width={width}
          count={1}
        />
      </p>
    </SkeletonTheme>
  )
}
