import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        width={38}
        height={20}
        src="/assets/images/logos/yidong.png"
        alt="logo"
        priority
      />
    </Link>
  );
}
