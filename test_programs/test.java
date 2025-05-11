public class test {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Lütfen 2 argüman girin.");
            return;
        }

        String arg1 = args[0];
        String arg2 = args[1];

        System.out.println("Hello " + arg1 + " and " + arg2 + "!");
    }
}
