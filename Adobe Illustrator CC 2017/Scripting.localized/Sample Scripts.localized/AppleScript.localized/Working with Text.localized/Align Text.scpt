FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

********************************************************     � 	 	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 5 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r   
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l     ��  ��    4 . Align all text frames in the current document     �   \   A l i g n   a l l   t e x t   f r a m e s   i n   t h e   c u r r e n t   d o c u m e n t      l     ��������  ��  ��     ��  l    _ ����  O     _    k    ^       I   	������
�� .miscactvnull��� ��� null��  ��        l  
 
��������  ��  ��        l  
 
��  ��    A ; Get a list of all the page items in the frontmost document     �     v   G e t   a   l i s t   o f   a l l   t h e   p a g e   i t e m s   i n   t h e   f r o n t m o s t   d o c u m e n t   ! " ! l  
 
�� # $��   # [ U For efficientcy reasons, you should always first set a variable to the list of items    $ � % % �   F o r   e f f i c i e n t c y   r e a s o n s ,   y o u   s h o u l d   a l w a y s   f i r s t   s e t   a   v a r i a b l e   t o   t h e   l i s t   o f   i t e m s "  & ' & l  
 
�� ( )��   ( ' ! and then execute the repeat loop    ) � * * B   a n d   t h e n   e x e c u t e   t h e   r e p e a t   l o o p '  +�� + Z   
 ^ , -�� . , l  
  /���� / =   
  0 1 0 l  
  2���� 2 I  
 �� 3��
�� .corecnte****       **** 3 2  
 ��
�� 
docu��  ��  ��   1 m    ����  ��  ��   - I   �� 4��
�� .sysodisAaleR        TEXT 4 m     5 5 � 6 6 P T h e r e   m u s t   b e   a t   l e a s t   o n e   o p e n   d o c u m e n t��  ��   . k    ^ 7 7  8 9 8 r    & : ; : n    $ < = < 2  " $��
�� 
cTXa = 4    "�� >
�� 
docu > m     !����  ; o      ���� 0 textframelist textFrameList 9  ? @ ? l  ' '��������  ��  ��   @  A�� A Z   ' ^ B C�� D B l  ' , E���� E =   ' , F G F n   ' * H I H 1   ( *��
�� 
leng I o   ' (���� 0 textframelist textFrameList G m   * +����  ��  ��   C I  / 4�� J��
�� .sysodisAaleR        TEXT J m   / 0 K K � L L R T h e r e   a r e   n o   t e x t   f r a m e s   i n   t h i s   d o c u m e n t��  ��   D k   7 ^ M M  N O N l  7 7�� P Q��   P 8 2 Now change the position of each of the page items    Q � R R d   N o w   c h a n g e   t h e   p o s i t i o n   o f   e a c h   o f   t h e   p a g e   i t e m s O  S�� S X   7 ^ T�� U T k   G Y V V  W X W l  G G�� Y Z��   Y    Get the original position    Z � [ [ 4   G e t   t h e   o r i g i n a l   p o s i t i o n X  \ ] \ r   G L ^ _ ^ n   G J ` a ` 1   H J��
�� 
paPs a o   G H���� 0 thetextframe theTextFrame _ o      ���� 0 theposition thePosition ]  b c b l  M M��������  ��  ��   c  d e d l  M M�� f g��   f ) # change the horizontal value to 200    g � h h F   c h a n g e   t h e   h o r i z o n t a l   v a l u e   t o   2 0 0 e  i j i r   M S k l k m   M N���� � l n       m n m 4   O R�� o
�� 
cobj o m   P Q����  n o   N O���� 0 theposition thePosition j  p q p l  T T��������  ��  ��   q  r s r l  T T�� t u��   t + % Change the position of the page item    u � v v J   C h a n g e   t h e   p o s i t i o n   o f   t h e   p a g e   i t e m s  w�� w r   T Y x y x o   T U���� 0 theposition thePosition y n       z { z 1   V X��
�� 
paPs { o   U V���� 0 thetextframe theTextFrame��  �� 0 thetextframe theTextFrame U o   : ;���� 0 textframelist textFrameList��  ��  ��    m      | |                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��  ��       �� } ~��   } ��
�� .aevtoappnull  �   � **** ~ �� ���� � ���
�� .aevtoappnull  �   � ****  k     _ � �  ����  ��  ��   � ���� 0 thetextframe theTextFrame �  |������ 5�������� K����������
�� .miscactvnull��� ��� null
�� 
docu
�� .corecnte****       ****
�� .sysodisAaleR        TEXT
�� 
cTXa�� 0 textframelist textFrameList
�� 
leng
�� 
kocl
�� 
cobj
�� 
paPs�� 0 theposition thePosition�� ��� `� \*j O*�-j j  
�j Y B*�k/�-E�O��,j  
�j Y ) &�[��l kh  ��,E�O���k/FO͠�,F[OY��Uascr  ��ޭ