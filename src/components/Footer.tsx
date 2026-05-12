export default function Footer() {
  return (
    <footer className="py-8 bg-dark text-center">
      <span className="font-roboto-slab text-muted text-sm">
        Copyright &copy; Blake Steel {new Date().getFullYear()}
      </span>
    </footer>
  );
}
