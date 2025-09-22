import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <Image width={36} height={36} src="/yidong.png" alt="logo" priority />
    </Link>
  );
}
