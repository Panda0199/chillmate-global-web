const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Built in AI Web Session 2026, ClearContent CMS, Student: Anik Joy, Team: team-frost
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy Policy</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;