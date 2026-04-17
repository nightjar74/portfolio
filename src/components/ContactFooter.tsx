import { Text, Button } from "@once-ui-system/core";

const ContactFooter = () => {
  return (
    <footer className="footer-container">
      {/* Main Heading */}
      <Text variant="display-strong-s" className="footer-heading" marginTop={4}>
        Let's make something together.
      </Text>

      {/* Contact Button */}
      <Button
        href="/contact"
        variant="primary"
        size="l"
        weight="strong"
        className="footer-button"
      >
        CONTACT
      </Button>

      {/* Bottom Credits */}
      <div className="footer-credits relative">
        <span className="footer-emoji absolute right-15 -translate-y-2.5">
          🌳
        </span>
        <span className="footer-emoji absolute right-7 -translate-y-2.5">
          🦙
        </span>
        <span className="text-sm absolute right-4 -translate-y-0.75">🦙</span>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Copyright - © ____________
        </Text>
        <div className="footer-credit-line">
          <Text variant="body-default-s" onBackground="neutral-weak">
            Developed by
          </Text>
          <span className="footer-emoji">🦙</span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
